"use server";
import { redirect } from "next/navigation";
import { Product, User } from "./model";
import { connectToDB } from "./utils";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const addUser = async (formData: FormData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);
    const updateFields: { [key: string]: FormDataEntryValue } = {
      username,
      email,
      phone,
      password: hashedPassword,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach((key) => {
      if (!updateFields[key]) {
        delete updateFields[key];
      }
    });

    await User.findByIdAndUpdate(id, updateFields);
    console.log("User updated");
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData: FormData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const newProducts = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProducts.save();
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData: FormData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  const updateFields: { [key: string]: FormDataEntryValue } = {
    title,
    desc,
    price,
    stock,
    color,
    size,
  };

  Object.keys(updateFields).forEach((key) => {
    if (!updateFields[key]) {
      delete updateFields[key];
    }
  });

  await Product.findByIdAndUpdate(id, updateFields);
  try {
    connectToDB();
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }

  // revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }

  // revalidatePath("/dashboard/products");
  redirect("/dashboard/users");
};

export const fetchUser = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const fetchProduct = async (id: string) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (e) {
    console.log(e);
  }
};

export const authenticateNormal = async (formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    connectToDB();
    await signIn("credentials", { username, password });
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    return { error: "Invalid credentials" };
  }
};

export const authenticate = async (prevState: any, formData: any) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    connectToDB();
    await signIn("credentials", { username, password });
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    return "Login failed";
  }
};
