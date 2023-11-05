import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  onSnapshot,
} from "firebase/firestore";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  // async function getProc(db) {
  //   const proc = collection(db, "product");
  //   const procSnapshot = await getDocs(proc);
  //   const procList = procSnapshot.docs.map((doc) => doc.data());
  //   console.log(procList);
  // }
  async function getProc() {
    const querySnapshot = await getDocs(collection(db, "product"));
    // console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // console.log(doc)
      console.log(doc.data());
      // 문서 id 가져오기
      // console.log(doc.id);
    });

    // const unsubscribe = onSnapshot(querySnapshot, (ss) => {
    //   ss.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       console.log("New product", change.doc.data());
    //     }
    //     if (change.type === "modified") {
    //       console.log("modified product", change.doc.data());
    //     }
    //     if (change.type === "removed") {
    //       console.log("Removed product", change.doc.data());
    //     }
    //   });
    // });
    // unsubscribe();
    //   const docRef = doc(db, "product");
    //   const docSnap = await getDoc(docRef);
    //   console.log(docSnap.data());
  }
  // getProc();
  const [procArea, setProcArea] = useState("");
  const [procName, setProcName] = useState("");
  const [procPrice, setProcPrice] = useState("");
  const saveProcArea = (e) => {
    setProcArea(e.target.value);
    // console.log(e.target.value);
  };
  const saveProcName = (e) => {
    setProcName(e.target.value);
    // console.log(e.target.value);
  };
  const saveProcPrice = (e) => {
    setProcPrice(e.target.value);
    // console.log(e.target.value);
  };
  async function addForm() {
    // await setDoc(doc(db, "product", "상품2"), {
    //   proc_area: procArea,
    //   proc_name: procName,
    //   proc_price: procPrice,
    // });
    await addDoc(collection(db, "product"), {
      proc_area: procArea,
      proc_name: procName,
      proc_price: procPrice,
    });
  }
  const procRef = doc(db, "product", "상품1");

  async function updateForm() {
    await updateDoc(procRef, { proc_price: 2000 });
  }

  async function deleteForm() {
    // 문서삭제
    await deleteDoc(doc(db, "product", "VzEhcvwpKaqtj9NAfqjn"));
    // EjmT7qg2CGxCCjvLwY12
    // VzEhcvwpKaqtj9NAfqjn
    // 필드삭제
    // await updateDoc(procRef, { procPrice: deleteField() });
  }
  return (
    <div className="App">
      <h1>Hello, React!!</h1>
      <p>
        <label>생산지역 : </label>
        <input onChange={saveProcArea} />
      </p>
      <p>
        <label>제품명 : </label>
        <input onChange={saveProcName} />
      </p>
      <p>
        <label>제품가격 : </label>
        <input onChange={saveProcPrice} />
      </p>
      <Button
        label="데이터확인"
        styleClass=""
        onClick={getProc}
        disabled={false}
      />
      <Button
        label="데이터추가"
        styleClass=""
        onClick={addForm}
        disabled={false}
      />
      <Button
        label="데이터수정"
        styleClass=""
        onClick={updateForm}
        disabled={false}
      />
      <Button
        label="데이터삭제"
        styleClass=""
        onClick={deleteForm}
        disabled={false}
      />
    </div>
  );
}

export default App;
