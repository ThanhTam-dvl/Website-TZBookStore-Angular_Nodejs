my-project/
│
├── frontend/                  # Thư mục chứa mã nguồn Angular (client-side)
│   ├── e2e/                   # Thư mục kiểm thử end-to-end (cho Angular)
│   ├── node_modules/          # Các package cài đặt qua npm
│   ├── src/                   # Thư mục mã nguồn chính của Angular
│   │   ├── app/               # Thư mục chứa các component, service, module
│   │   │   ├── components/    # Các component của ứng dụng (ví dụ: header, footer, product-list, ...)
│   │   │   ├── pages/         # Các trang của ứng dụng (ví dụ: home, about, product, ...)
│   │   │   ├── services/      # Các service dùng để giao tiếp với backend
│   │   │   ├── app.module.ts  # Module chính của ứng dụng
│   │   │   ├── app.component.ts # Component chính của ứng dụng
│   │   │   ├── app-routing.module.ts # Cấu hình routing của Angular
│   │   ├── assets/            # Các tài nguyên tĩnh như ảnh, file css, fonts
│   │   ├── environments/      # Các cấu hình môi trường (development, production)
│   │   ├── index.html         # File HTML chính
│   │   └── main.ts            # File entry point của ứng dụng Angular
│   ├── angular.json           # Cấu hình dự án Angular
│   ├── package.json           # Các thông tin về package và các dependencies của Angular
│   └── tsconfig.json          # Cấu hình TypeScript cho Angular
│
├── backend/                   # Thư mục chứa mã nguồn Node.js (server-side)
│   ├── node_modules/          # Các package cài đặt qua npm cho backend
│   ├── src/                   # Mã nguồn chính của Node.js
│   │   ├── controllers/       # Các controller (logic xử lý các request)
│   │   ├── routes/            # Các file route (cấu hình các endpoint API)
│   │   ├── models/            # Các mô hình dữ liệu (ví dụ: User, Product, ...)
│   │   ├── services/          # Các dịch vụ liên quan đến logic nghiệp vụ
│   │   ├── app.js             # File entry point của server Node.js (hoặc server.js)
│   │   ├── config.js          # Các cấu hình chung (database, server, ...)
│   ├── package.json           # Các thông tin về package và các dependencies của Node.js
│   └── .env                   # Các biến môi trường (như database URL, API keys)
│
└── README.md                  # File hướng dẫn sử dụng dự án


run backend: npx nodemon server.js
run frontend: ng serve -o
