document.addEventListener('DOMContentLoaded', () => {
    const studentList = document.getElementById('student-list');
    const searchBox = document.getElementById('search-box');
    const categoryFilter = document.getElementById('category-filter');

    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            // Fungsi untuk mengacak array
            const shuffleArray = array => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            // Fungsi untuk menampilkan daftar siswa
            const displayStudents = (students) => {
                studentList.innerHTML = '';
                shuffleArray(students).forEach(student => { // Mengacak siswa sebelum ditampilkan
                    const card = document.createElement('a');
                    card.classList.add('student-card');
                    card.href = `student.html?id=${student.id}`;
                    card.innerHTML = `
                        <img src="${student.foto}" alt="${student.nama}">
                        <h3>${student.nama}</h3>
                    `;
                    studentList.appendChild(card);
                });
            };

            // Fungsi untuk menyaring dan menampilkan siswa berdasarkan filter
            const filterAndDisplayStudents = () => {
                const searchTerm = searchBox.value.toLowerCase();
                const category = document.querySelector('.category-button.active')?.dataset.category || 'all';
                const filteredStudents = data.students.filter(student => {
                    const matchesSearch = student.nama.toLowerCase().includes(searchTerm);
                    const matchesCategory = category === 'all' ||
                        (category === 'male' && student.gender === 'Lelaki') ||
                        (category === 'female' && student.gender === 'Perempuan') ||
                        student.kelas === category;
                    return matchesSearch && matchesCategory;
                });
                displayStudents(filteredStudents);
            };

            // Event listener untuk input pencarian
            searchBox.addEventListener('input', filterAndDisplayStudents);

            // Event listener untuk filter kategori
            categoryFilter.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-button')) {
                    document.querySelectorAll('.category-button').forEach(button => {
                        button.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    filterAndDisplayStudents();
                }
            });

            // Menampilkan siswa pertama kali
            displayStudents(shuffleArray(data.students)); // Memanggil fungsi shuffleArray untuk mengacak siswa pertama kali
        });
});
