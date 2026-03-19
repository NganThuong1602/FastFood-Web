document.addEventListener("DOMContentLoaded", () => {
    const exportBtn = document.getElementById("export-json-btn");

    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            // 1. Lấy dữ liệu sản phẩm từ LocalStorage (giống cách bạn làm trong admin.js)
            const products = JSON.parse(localStorage.getItem("products")) || [];

            if (products.length === 0) {
                alert("Không có dữ liệu để xuất!");
                return;
            }

            // 2. Chuyển mảng dữ liệu thành chuỗi JSON
            const dataStr = JSON.stringify(products, null, 2); // null, 2 giúp file dễ đọc hơn
            const dataBlob = new Blob([dataStr], { type: "application/json" });

            // 3. Tạo một liên kết tải về ảo
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement("a");
            
            link.href = url;
            link.download = "danh-sach-san-pham.json"; // Tên file khi tải về
            
            // 4. Kích hoạt tải về và dọn dẹp
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
});