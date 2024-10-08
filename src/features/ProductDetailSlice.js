import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetching Product Details
export const showProduct = createAsyncThunk(
  "productDetail/showProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a Product
export const createProduct = createAsyncThunk(
  "productDetail/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating product:", error); // Debugging output
      return rejectWithValue(error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return id; // Return the id of the deleted product
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update data

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data, { rejectWithValue }) => {
    const updatedData = { ...data, rating: parseFloat(data.rating) }; // Ensure rating is a number

    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/kirangaikwad0/SampleJSONPlaceholder/products/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const ProductDetail = createSlice({
  name: "productDetail",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(showProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload // Remove the deleted product
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture the error message
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset the error on new update
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use action.payload directly for error
      });
  },
});

export default ProductDetail.reducer;
