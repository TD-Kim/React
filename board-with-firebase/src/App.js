import { db } from "./firebase";
import { collection, getDocs, doc } from "firebase/firestore";

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
      console.log(doc.data());
    });
    //   const docRef = doc(db, "product");
    //   const docSnap = await getDoc(docRef);
    //   console.log(docSnap.data());
  }
  getProc();
  return (
    <div className="App">
      <h1>Hello, React!!</h1>
    </div>
  );
}

export default App;
