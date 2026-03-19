document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("dark-mode-toggle");
    const icon = document.getElementById("dark-mode-icon");

    // 1. Kiểm tra trạng thái đã lưu
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        icon.classList.replace("fa-moon-o", "fa-sun-o");
    }

    // 2. Sự kiện Click
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            icon.classList.replace("fa-moon-o", "fa-sun-o"); // Đổi sang mặt trời
        } else {
            localStorage.setItem("theme", "light");
            icon.classList.replace("fa-sun-o", "fa-moon-o"); // Đổi sang mặt trăng
        }
    });
});
