
import AxiosConfig from "../../WebService/AxiosConfig";

export async function getProduct() {
  return await AxiosConfig.get('/product/product')
}


export async function addProduct(product) {
  console.log("product", product)
  const formData = new FormData();
  formData.append("productCode", product?.productCode);
  formData.append("productName", product.productName);
  formData.append("description", product.description);
  formData.append("unit", product.unit);
  formData.append("price", product.price || "");
  formData.append("quantity", product.quantity || "");
  formData.append("currency", product.currency);
  formData.append("weight", product.weight || "");
  formData.append("discount", product.discount || "");
  formData.append("hsnCode", product.hsnCode || "");
  formData.append("gst", product.gst || "");
  formData.append("serialNo", JSON.stringify(product.serialNo || []));
  formData.append("category", product.category);
  formData.append("subCategory", product.subCategory || "0");
  formData.append("make", product.make || "");
  formData.append("countryOfOrigin", product.countryOfOrigin || "");
  formData.append("manufaturingYearAndMonth", product.manufaturingYearAndMonth || "");
  formData.append("State", product.State || "");
  formData.append("district", product.district || "");
  formData.append("brand", product.brand);


  if (product?.images?.length) {
    product.images.forEach((img) => {
      formData.append("images", img);
    });
  }

  product?.technicaldocs?.forEach((doc, index) => {
    formData.append("technicaldocs", doc);
  });
  if (
    product?.additional_fields &&
    Array.isArray(product.additional_fields) &&
    product.additional_fields.some(field => Object.keys(field).length > 0)
  ) {
    formData.append('additional_fields', JSON.stringify(product.additional_fields));
  }


  return await AxiosConfig.post('/product/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}



export async function editProduct(product) {
  return await AxiosConfig.patch('/product/product', product, {
    data: product
  });
}




export async function DeleteProduct(del) {
  console.log("dele", del)
  return await AxiosConfig.delete('/product/product', {
    data: del
  });
}




export async function GetCategory() {
  return await AxiosConfig.get('/product/category')
}

export async function GetSubCategory(category) {
  return await AxiosConfig.get(`/product/subCategory`, {
    params: { catId: category.catId }
  });
}


export async function GetBrand() {
  return await AxiosConfig.get('/product/brand')
}




export async function editImage(product) {
  console.log("edit image", product)

  const formData = new FormData();
  formData.append("productCode", product?.productCode);
  formData.append("id", product?.id);
  formData.append("image", product.image);

  return await AxiosConfig.post('/product/change_image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}



export async function editTechImage(product) {
  console.log("product ", product)
  const formData = new FormData();
  formData.append("productCode", product?.productCode);
  formData.append("id", product?.id);
  formData.append("technicaldoc", product.image);



  return await AxiosConfig.post('/product/change_docs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}



export async function addImage(product) {
  console.log("edit image", product);

  const formData = new FormData();
  formData.append("productCode", product?.productCode);

  if (product?.image?.length) {
    product.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img);
      } else {
        formData.append("image", img);
      }
    });
  }


  return await AxiosConfig.post('/product/add_image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}



export async function addTechImage(product) {
  console.log("product ", product)
  const formData = new FormData();
  formData.append("productCode", product?.productCode);
  if (product?.technicaldoc?.length) {
    product.technicaldoc.forEach((img) => {
      if (img instanceof File) {
        formData.append("technicaldoc", img);
      } else {
        formData.append("technicaldoc", img);
      }
    });
  }

  return await AxiosConfig.post('/product/add_docs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}








export async function DeleteProductImage(del) {
  console.log("dele", del)
  return await AxiosConfig.delete('/product/delete_image', {
    data: del
  });
}


export async function DeleteProductTechImage(del) {
  console.log("dele", del)
  return await AxiosConfig.delete('/product/delete_docs', {
    data: del
  });
}
