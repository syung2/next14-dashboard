import { Product, User } from "./model";
import { connectToDB } from "./utils";

export const fetchUsers = async (q: string, page: number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 15;
  try {
    connectToDB();
    const count = await User.find({
      username: { $regex: regex },
    }).countDocuments();
    const users = await User.find({
      username: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const fetchProducts = async (q: string, page: number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 15;
  try {
    connectToDB();
    const count = await Product.find({
      title: { $regex: regex },
    }).countDocuments();
    const products = await Product.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (error) {
    throw new Error(String(error));
  }
};
