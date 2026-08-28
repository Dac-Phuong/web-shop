1.Thư Viện
Nginx
MongoDB 7
Node 22

2.Cài Node
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt install -y nodejs

3. Chạy npm install

4. Sửa file .env

5. Chạy npm run build

6. Thêm Web 
domain.com

7. Thêm URL Rewite
location /uploads/ {
  alias /www/wwwroot/web-shop/public/uploads/;
}