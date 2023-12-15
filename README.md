## Backend - IoT Water Usage Monitoring

Aplikasi backend untuk memproses data monitoring dari IoT dan yang digunakan pada Aplikasi Mobile.

### Prerequisites

- Docker



### Installation	

1. Setup Firebase Project
2. Download Firebase Key pada Project Settings → Service Accounts → Generate new private key
3. Simpan file tersebut dengan nama `firebase-adminsdk.json` pada `[IoT Water Usage Monitoring]/service-accounts/`

4. Ubah `.env.backup` ke `.env`

5. Sesuaikan `.env` dengan konfigurasi system yang anda gunakan

6. Pada `JWT_SECRET_KEY` di `.env`  gunakan text random atau generate menggunakan NodeJs 

   ```js
   crypto.randomBytes(16).toString('hex');
   ```

7. Jalankan aplikasi backend dengan docker

   ```bash
   docker-compose up -d --build 
   ```

8. Kemudian jalankan background service dengan masuk ke container `web`, kemudian jalankan `all-service.sh`

   ```bash
   sh all-service.sh
   ```

   Atau

   ```bash
   pm2 start --name "histories-service" npm -- run histories-service # History Daily Report
   pm2 start --name "bill-service" npm -- run bill-service # Automatic Bill System
   ```

   



## Roadmap

- [x] Rest API
- [x] Automatic Daily Report
- [x] Automatic Bill System
- [ ] Web Dashboard



## Contact

Riski Kukuh Wiranata - [@riskikukuh_](https://twitter.com/riskikukuh_) - <a href="mailto:riskikukuh.me@gmail.com">riskikukuh.me@gmail.com</a>

Project Link: [https://github.com/riskikukuh/backend-iot-water-usage-monitoring](https://github.com/riskikukuh/backend-iot-water-usage-monitoring
