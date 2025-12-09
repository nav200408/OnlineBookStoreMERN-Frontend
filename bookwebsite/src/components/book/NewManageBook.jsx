import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBook, getBookAdmin } from "../../service/bookAPI";
import "../../assets/styles/NewManageBook.css"

export function NewManageBook() {
    let navigate = useNavigate();
    let location = useLocation();
    const [books, setBooks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 
    const [deleteFlag,setDeleteFlag]= useState(false);

    useEffect(() => {
        getBooks();
    }, [deleteFlag]);

    async function getBooks() {
        try {
            let res = await getBookAdmin();
            if (Array.isArray(res)) setBooks(res);
            else if (res?.data && Array.isArray(res.data)) setBooks(res.data);
            else setBooks([]);
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
        }
    }

    // --- PAGINATION LOGIC ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Map this slice instead of the full array
    const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(books.length / itemsPerPage);

    // Create an array of page numbers [1, 2, 3...]
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>Book Inventory</h2>

            <div className="manage-book-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Book Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Disc.</th>
                            <th>Description</th>
                            <th>Publish Date</th>
                            <th>Created At</th>
                            <th>Is Deleted</th>
                            <th className="manage-book-sticky-action">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            // MAPPING THE SLICED ARRAY
                            currentItems.map((book) => (
                                <tr key={book._id}>
                                    <td>{book._id}</td>
                                    <td>
                                        <img 
                                            src={`http://localhost:8080/stream/api/image?filename=${book?.bookImage}`} 
                                            alt={book.bookTitle} 
                                            className="manage-book-thumb" 
                                        />
                                    </td>
                                    <td className="manage-book-font-bold">{book.bookTitle}</td>
                                    <td>
                                        <span className="manage-book-badge manage-book-badge-blue">
                                            {Array.isArray(book.bookCategory) 
                                                ? book.bookCategory.join(", ") 
                                                : book.bookCategory} 
                                        </span>
                                    </td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.quantity}</td>
                                    <td>${book.price}</td>
                                    <td>{book.discount}%</td>
                                    <td className="manage-book-truncate" title={book.description}>
                                        {book.description}
                                    </td>
                                    <td>{book.publishDate}</td>
                                    <td>{book.createdAt}</td>
                                    <td>
                                        {book.isDelete ? (
                                            <span className="manage-book-status-deleted">Deleted</span>
                                        ) : (
                                            <span className="manage-book-status-active">Active</span>
                                        )}
                                    </td>
                                    <td className="manage-book-sticky-action">
                                        <button className="manage-book-btn manage-book-btn-edit" onClick={()=>{return navigate(`/seller/update-book?bookId=${book._id}`)}}
                                        >Edit</button>
                                        <button className="manage-book-btn manage-book-btn-delete" onClick={async()=>{
                                          try{
                                          let res = await deleteBook(book._id);
                                          console.log(res.status)
                                          if(res.status ==200){
                                           return setDeleteFlag(!deleteFlag);
                                          }
                                          return alert(res.data);
                                        }catch(err){
                                          alert("Some thing went wrong");    
                                        }                                     
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="14" style={{textAlign: "center", padding: "20px"}}>
                                    No books found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {books.length > 0 && (
                <div className="manage-book-pagination-container">
                    <ul className="manage-book-pagination">
                        {/* Prev Button */}
                        <li>
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className="manage-book-page-btn"
                            >
                                &laquo; Prev
                            </button>
                        </li>

                        {/* Number Buttons */}
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => handlePageChange(number)}
                                    className={`manage-book-page-btn ${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li>
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                                className="manage-book-page-btn"
                            >
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}