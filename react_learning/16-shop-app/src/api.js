import axios from 'axios';
import { parseFirestoreFields, toFirestoreFields } from './restAPI';

export const API_KEY = 'AIzaSyAeVAA1GOql8fn9OuSe2LrhG2pzNLBWdF8';
const BASE_URL =
  'https://firestore.googleapis.com/v1/projects/shop-app-c8539/databases/(default)/documents';
const AUTH_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

function getResultData(response) {
  if (response.data.length > 0) {
    return response.data.map((data) => {
      return {
        ...parseFirestoreFields(data.document.fields),
        docId: data.document.name.split('/').pop(),
      };
    });
  } else {
    return {
      ...parseFirestoreFields(response.data.fields),
      docId: response.data.name.split('/').pop(),
    };
  }
}

export async function getDatasRest(collectionName, queryOptions) {
  const {
    conditions: [condition],
  } = queryOptions;
  const { field, op: operator, value } = condition;
  try {
    const response = await api.post(`:runQuery`, {
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: operator,
            value: {
              stringValue: value,
            },
          },
        },
      },
    });
    return getResultData(response);
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    throw error;
  }
}

export async function getProduct(productId) {
  const response = await api.get(`/products/${productId}`);
  return getResultData(response);
}

export async function addDatasRest(collectionName, addObj) {
  addObj = toFirestoreFields(addObj);
  await api.patch(collectionName, { fields: addObj });
}

export async function signUpUser(url, email, password) {
  try {
    const response = await authApi.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log('User signed up successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error.response.data);
  }
}

export async function signInUser(url, email, password) {
  try {
    const response = await authApi.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log('User signed up successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error.response.data);
  }
}

export async function asyncCartRest(uid, cartArr) {
  try {
    const requests = cartArr.map((item) => {
      return {
        create: {
          name: `projects/shop-app-c8539/databases/(default)/documents/users/${uid}/cart/${item.id}`,
          fields: toFirestoreFields(item),
        },
      };
    });

    const response = await api.post(
      `:batchWrite`,
      {
        requests,
      },
      {
        params: {
          key: API_KEY,
        },
      }
    );
    console.log('BatchWrite response:', response.data);
    const resultData = await api.get(`/users/${uid}/cart`);
    return parseFirestoreFields(resultData);
  } catch (error) {
    console.error('Error performing batch write:', error);
    return false;
  }
}

export default api;
