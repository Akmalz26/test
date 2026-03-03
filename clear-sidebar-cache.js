// Clear localStorage untuk admin sidebar
// Paste kode ini di Browser Console (F12) saat di halaman admin

console.log('Current sidebar state:', localStorage.getItem('adminSidebarOpen'));
localStorage.removeItem('adminSidebarOpen');
console.log('Sidebar state cleared!');
location.reload();
