import { db, storage } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import { ProductType } from "@/types/types";

export async function productsData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const datas = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return datas;
}

export async function productById(id: string) {
  const snapshot = await getDoc(doc(db, "products", id));
  const data = snapshot.data();
  return data;
}

export async function createProduct(
  productData: ProductType,
  callback: Function
) {
  await addDoc(collection(db, "products"), productData)
    .then(() => {
      callback({ status: true, message: "Product Berhasil Dibuat" });
    })
    .catch((error) => {
      callback({ status: false, message: error.message });
    });
}

export async function updateProduct(
  productId: string,
  productData: ProductType,
  callback: Function
) {
  await updateDoc(doc(db, "products", productId), productData)
    .then(() => {
      callback({ status: true, message: "Product Berhasil Diubah" });
    })
    .catch((error) => {
      callback({ status: false, message: error.message });
    });
}

export async function deleteProduct(productId: string, callback: Function) {
  await deleteDoc(doc(db, "products", productId))
    .then(() => {
      callback({ status: true, message: "Product Berhasil Dihapus" });
    })
    .catch((error) => {
      callback({ status: false, message: error.message });
    });
}

export async function addToCarts(
  product: any,
  userName: string,
  callback: Function
) {
  const q = query(
    collection(db, "carts"),
    where("userName", "==", userName),
    where("productId", "==", product.id)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    await updateDoc(doc(db, "carts", data[0].id), {
      quantity: (data[0] as any).quantity + 1,
    });
  } else {
    await addDoc(collection(db, "carts"), {
      userName: userName,
      productId: product.id,
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
      stock: product.stock,
      quantity: 1,
    })
      .then(() => {
        callback({ status: true, message: "Carts Berhasil Dibuat" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
      });
  }
}

export async function deleteProductInCarts(
  productId: string,
  callback: Function
) {
  await deleteDoc(doc(db, "carts", productId))
    .then(() => {
      callback({ status: true, message: "Product Berhasil Dihapus" });
    })
    .catch((error) => {
      callback({ status: false, message: error.message });
    });
}

export async function Register(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ status: false, message: "Email sudah terdaftar!" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user";
    await addDoc(collection(db, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register Berhasil" });
      })
      .catch((error) => {
        callback({ status: false, message: "Register Gagal" + error });
      });
  }
}

export async function Login(userData: { email: string }) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}
