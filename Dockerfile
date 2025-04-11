# Sử dụng image Node.js làm base image
FROM node:18 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --legacy-peer-deps --verbose

# Copy toàn bộ mã nguồn vào container
COPY . .

#FOR DEVELOPMENT
# Expose cổng ứng dụng
EXPOSE 3000

# Khởi chạy ứng dụng React ở chế độ phát triển
CMD ["npm", "start"]
#FOR DEVELOPMENT

# #FOR PRODUCTION
# # Build ứng dụng React  
# RUN npm run build

# # Sử dụng image Nginx để chạy ứng dụng
# FROM nginx:alpine

# # Copy build từ image trước vào thư mục Nginx
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy tệp nginx.conf vào container Nginx 
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80 để truy cập vào ứng dụng
# EXPOSE 80

# # Start Nginx để phục vụ ứng dụng React
# CMD ["nginx", "-g", "daemon off;"]
# #FOR PRODUCTION
