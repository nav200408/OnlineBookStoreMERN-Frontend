import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getBooks,
  bookByDiscount,
  bookByReview,
  newestBooks,
  filterBooksByCategories,
} from "../../service/bookAPI";
import { Button } from "react-bootstrap";
import { getAllCategories } from "../../service/categoryAPI";
import { getBookReviews } from "../../service/reviewAPI";
import { HandlePagination } from "../Listing/Pagination";

function Home(props) {
  const navigate = useNavigate();
  let [books, setBooks] = useState(null);
  useEffect(()=>{
    filteration();
  },[props.category]);

  async function filteration() {
    console.log("Iam here")
    let result = await filterBooksByCategories(props.category);
    console.log(result)
    let books = result.data.books
    setBooks(books);
  }

  if (!books) return <Spinner animation="border" />;
  return (
    <>
    <Container fluid className="py-5 book-listing-section">
     
      
      <Row xs={2} md={3} lg={4} xl={4} className="g-4 justify-content-center">
        {books.map((book, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <Card className="h-100 book-listing-card">
              
              <div className="book-image-container">
                <Card.Img 
                  variant="top" 
                  src={`http://localhost:8080/stream/api/image?filename=${book.bookImage}`} 
                  alt={book.bookTitle}
                  className="book-image"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="book-title mb-2">{book.bookTitle}</Card.Title>
                <div className="mt-auto">
                  <div className="price-container mb-3">
                    <span className="current-price">${book.price?.toFixed(2)}</span>
                    {book.originalPrice && page === "best-discount" && (
                      <span className="original-price text-decoration-line-through">${book.originalPrice?.toFixed(2)}</span>
                    )}
                  </div>
                  <Button variant="primary" className="w-100 btn-details" onClick={()=>{
                        navigate(`/book-detail/${book._id}`)
                  }}>View Details</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
    </Container>
    </>
  );

  
}

export default Home;
