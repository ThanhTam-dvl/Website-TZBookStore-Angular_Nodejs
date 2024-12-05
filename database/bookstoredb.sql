-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 05, 2024 lúc 09:53 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bookstoredb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `author` varchar(100) NOT NULL,
  `publisher` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `published_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`book_id`, `title`, `category_id`, `author`, `publisher`, `description`, `price`, `stock_quantity`, `image_url`, `published_date`) VALUES
(1, 'Đắc Nhân Tâm', 1, 'Dale Carnegie', NULL, 'Quyển sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và giao tiếp với mọi người để đạt được thành công trong cuộc sống', 99.00, 20, 'https://cungdocsach.vn/wp-content/uploads/2020/10/%C4%90%E1%BA%AFc-nh%C3%A2n-t%C3%A2m-3.jpg', NULL),
(2, 'Nhà Giả Kim', 1, 'Paulo Coelho', NULL, 'Những triết lý sâu sắc trong \"Nhà Giả Kim\" nhấn mạnh vào ý tưởng rằng mỗi người đều có khả năng biến giấc mơ của mình thành hiện thực, miêu tả sự quan trọng của việc khám phá và theo đuổi ước mơ của mình, dù cho có gặp phải những khó khăn và thử thách như thế nào.', 80.00, 20, 'https://doanducdong.com/wp-content/uploads/2021/10/nha-gia-kim-1.jpg', NULL),
(3, '7 Thói Quen Hiệu Quả', 3, 'Stephen Covey', NULL, '\"7 Thói Quen Hiệu Quả\" của Stephen R. Covey là một cuốn sách về phát triển cá nhân và quản lý cuộc sống. Cuốn sách giới thiệu bảy thói quen giúp con người trở nên hiệu quả hơn trong cuộc sống và công việc...', 99.00, 20, 'https://sachnoi.cc/wp-content/uploads/2021/09/Sach-Noi-7-thoi-quen-de-thanh-dat-Stephen-R-Covey-audio-book-sachnoi.cc-5.jpg', NULL),
(4, 'Cristiano Ronaldo', 3, 'CR7', NULL, 'Youtuber top 1 thế giới', 7.00, 7, 'https://wallpapercave.com/wp/wp10773535.jpg', NULL),
(5, 'Tư duy ngược', 1, 'Nguyễn Anh Dũng', NULL, 'Cuốn sách này khám phá và khuyến khích người đọc áp dụng phương pháp tư duy ngược để giải quyết vấn đề và đạt được thành công trong cuộc sống.', 89.00, 20, 'https://sbooks.vn/wp-content/uploads/2024/06/Sach-Tu-Duy-Nguoc.jpeg', NULL),
(6, 'Rèn luyện tư duy phản biện', 1, 'Albert Rutheford', NULL, 'Một cuốn sách cung cấp các phương pháp và công cụ để phát triển khả năng tư duy phản biện. Sách giúp người đọc nhận diện và đánh giá các lập luận, phân biệt giữa các lý lẽ hợp lý và không hợp lý, cũng như cách tránh các sai lầm trong lập luận...', 79.00, 20, 'https://phamvanquy.com/wp-content/uploads/2023/04/06a7831bd25ac833631eb5744907f373.jpg', NULL),
(7, 'Hoàng tử bé', 2, 'Antoine de Saint-Exupéry', NULL, 'Thông qua hành trình khám phá các hành tinh khác nhau của Hoàng Tử Bé, câu chuyện đưa ra những bài học sâu sắc về tình yêu, tình bạn, sự trưởng thành và cách nhìn nhận thế giới một cách trong sáng, chân thành. Với lối viết giàu hình ảnh và ẩn dụ, \"Hoàng Tử Bé\" không chỉ dành cho trẻ em mà còn mang ý nghĩa sâu sắc đối với người lớn.', 50.00, 21, 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/473670otI/hoang-tu-be-1054177.jpg', NULL),
(8, 'Sổ đỏ', 2, 'Vũ Trọng Phụng', NULL, 'Tác phẩm là một bức tranh châm biếm sâu sắc về xã hội Việt Nam thời kỳ thuộc địa, nơi sự suy đồi đạo đức, thói hư danh và lối sống trụy lạc được phơi bày một cách trần trụi.\r\n\r\nNhân vật chính, Xuân Tóc Đỏ, là một kẻ vô học nhưng nhờ vận may và sự láu cá, đã leo lên những vị trí cao trong xã hội. Qua hành trình của Xuân, tác phẩm chế nhạo các giá trị giả tạo của tầng lớp thượng lưu và sự tha hóa của văn hóa thời bấy giờ.\r\n\r\n\"Số Đỏ\" không chỉ là một câu chuyện hài hước mà còn mang ý nghĩa phê phán xã hội sâu sắc, khẳng định tài năng và tầm nhìn của Vũ Trọng Phụng trong văn học hiện thực phê phán.', 49.00, 21, 'https://cdn.tgdd.vn/Files/2023/03/10/1516432/10-cuon-sach-van-hoc-hay-tieu-thuyet-van-hoc-kinh-dien-202303110854161072.jpg', NULL),
(9, 'Đạo kinh doanh', 3, 'Nguyễn Anh Dũng', NULL, 'Tập trung vào việc khai thác triết lý kinh doanh từ góc nhìn sâu sắc về đạo đức, nhân văn và văn hóa Á Đông. Cuốn sách không chỉ đưa ra những bài học về cách làm giàu bền vững mà còn nhấn mạnh sự cân bằng giữa lợi ích kinh tế và giá trị đạo đức.\r\n\r\nTác giả Nguyễn Anh Dũng kết hợp giữa kinh nghiệm thực tiễn và tư duy triết học để trình bày những nguyên tắc kinh doanh có ý nghĩa vượt thời gian. Nội dung phù hợp với doanh nhân, nhà quản lý và cả những người đang tìm kiếm sự phát triển toàn diện trong cuộc sống và sự nghiệp.', 69.00, 22, 'https://static-images.vnncdn.net/files/publish/2023/10/11/dao-kinh-doanh-lot-top-10-cuon-sach-dang-doc-545.jpeg?width=0&s=qEYJLCJxaZvJNH4-qBaL1g', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_categories`
--

CREATE TABLE `book_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `book_categories`
--

INSERT INTO `book_categories` (`category_id`, `category_name`, `description`) VALUES
(1, 'Self-Help', 'Sách phát triển bản thân'),
(2, 'Fiction', 'Sách văn học'),
(3, 'Business', 'Sách kinh doanh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_reviews`
--

CREATE TABLE `book_reviews` (
  `review_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `review_text` text DEFAULT NULL,
  `review_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `book_id`, `user_id`, `quantity`) VALUES
(8, 8, 1, 2),
(13, 6, 1, 1),
(14, 4, 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `payment_method` enum('COD','BANK_TRANSFER','CREDIT_CARD') NOT NULL,
  `order_notes` text DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT 'Male',
  `birth_date` date DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('admin','customer','staff') DEFAULT 'customer',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `full_name`, `gender`, `birth_date`, `phone`, `address`, `role`, `is_active`, `created_at`) VALUES
(1, 'admin', 'adminthanhtam@bookstore.com.vn', '123456', 'Admin Thành Tâm', 'Male', NULL, NULL, NULL, 'admin', 1, '2024-12-01 03:54:00'),
(2, 'customer1', 'customer1@bookstore.com.vn', '123456', 'Customer', 'Male', NULL, NULL, NULL, 'customer', 1, '2024-12-01 03:54:00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `book_categories`
--
ALTER TABLE `book_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `book_reviews`
--
ALTER TABLE `book_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `book_categories`
--
ALTER TABLE `book_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `book_reviews`
--
ALTER TABLE `book_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `book_categories` (`category_id`);

--
-- Các ràng buộc cho bảng `book_reviews`
--
ALTER TABLE `book_reviews`
  ADD CONSTRAINT `book_reviews_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  ADD CONSTRAINT `book_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
