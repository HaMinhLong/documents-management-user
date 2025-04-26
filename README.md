# Documents Management - User Frontend

## Ảnh giới thiệu

Frontend dự án quản lý tài liệu cho người dùng:

- Đăng nhập/Đăng ký
- Quản lý tài liệu
- Xem, tải và chuyển đổi định dạng tài liệu

Frontend dùng **React**, **TypeScript**, **TailwindCSS** và **CRACO**.

## Các công nghệ sử dụng

- React 18
- TypeScript
- TailwindCSS
- Axios
- React Router DOM

## Hướng dẫn cài đặt

1. Clone project:

```bash
git clone https://github.com/HaMinhLong/documents-management-user.git
cd documents-management-user
```

2. Cài dependencies:

```bash
yarn install
```

3. Tạo file `.env` từ `.env.example` và điền thông tin API backend.

4. Chạy dự án:

```bash
yarn start
```

5. Truy cập: [http://localhost:3000](http://localhost:3000)

## Scripts hỗ trợ

| Lệnh         | Mô tả                     |
| :----------- | :------------------------ |
| `yarn start` | Chạy ứng dụng development |
| `yarn build` | Build ứng dụng production |
| `yarn test`  | Chạy unit tests           |

## Cấu trúc thư mục

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── App.tsx
├── .env.example
├── tailwind.config.js
├── craco.config.js
└── tsconfig.json
```

## Ghi chú

- Cần cài đặt Node.js >= 18.x và Yarn.
- Backend API URL cần được định nghĩa trong `.env`.
