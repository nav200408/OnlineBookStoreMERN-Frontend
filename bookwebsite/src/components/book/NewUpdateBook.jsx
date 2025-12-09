import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/NewUpdateBook.css";
import { getBookDetails, updateBookAdmin } from "../../service/bookAPI";

export function NewUpdateBook() {
    let navigate = useNavigate();
     let location = useLocation();
    let query = new URLSearchParams(location.search);
  let bookId = query.get("bookId");
  console.log(bookId);
  let [formData, setFormData] = useState({
    bookTitle: "",
    publisher: "",
    author: "",
    quantity: "",
    description: "",
    publishDate: "",
    bookCategory: "",
    bookDiscount: "",
    price: ""
  });
  useEffect(()=>{
    getBookById(bookId);
  },[]);
   async function getBookById(bookId){
      let res = await getBookDetails(bookId);
      setFormData({
    bookTitle: res.data.bookTitle,
    publisher: res.data.publisher,
    author: res.data.author,
    quantity: res.data.quantity,
    description: res.data.description,
    publishDate: res.data.publishDate,
    bookCategory: res.data.bookCategory,
    bookDiscount: res.data.bookDiscount,
    price: res.data.price
      })
    }
  let [file,setFile]=useState(); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFile=(e)=>{
    setFile(e.target.files[0]);
  }

  const handleSubmit =async (e) => {
e.preventDefault();
  let dataForm = new FormData();
  dataForm.append("bookId",bookId);
  dataForm.append("bookTitle",formData.bookTitle);
  dataForm.append("publisher",formData.publisher);
  dataForm.append("author",formData.author);
  dataForm.append("description",formData.description);
  dataForm.append("publishDate",formData.publishDate);
  dataForm.append("bookCategory",formData.bookCategory);
  dataForm.append("bookDiscount",formData.bookDiscount);
  dataForm.append("price",formData.price);
  dataForm.append("file",file);
  let res = await updateBookAdmin(dataForm);
  console.log(res.status)
  if(res.status ==200){
    return navigate("/seller/my-shop")
  }
  return alert(res.data.message);

  };

  return (
    <>
      <form className="update-book-form" onSubmit={handleSubmit}>
        <h2 className="update-book-title">Update Book</h2>

        <div className="update-book-group">
          <label>Book Title</label>
          <input
            type="text"
            className="update-book-input"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Publisher</label>
          <input
            type="text"
            className="update-book-input"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Author</label>
          <input
            type="text"
            className="update-book-input"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Quantity</label>
          <input
            type="number"
            className="update-book-input"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Description</label>
          <textarea
            className="update-book-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required={true}
          ></textarea>
        </div>

        <div className="update-book-group">
          <label>Publish Date</label>
          <input
            type="date"
            className="update-book-input"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Book Category</label>
          <input
            type="text"
            className="update-book-input"
            name="bookCategory"
            value={formData.bookCategory}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Book Discount (%)</label>
          <input
            type="number"
            className="update-book-input"
            name="bookDiscount"
            value={formData.bookDiscount}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Price</label>
          <input
            type="number"
            className="update-book-input"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="update-book-group">
          <label>Upload Image</label>
          <input
            type="file"
            className="update-book-file"
            name="image"
            onChange={handleFile}
            required={true}
          />
        </div>

        <button type="submit" className="update-book-submit" onClick={handleSubmit}>
          Submit
        </button>

        <button type="button" className="cancel-update-book" onClick={()=>{return navigate("/seller/my-shop")}}>
            Cancel
        </button>
      </form>
    </>
  );
}
