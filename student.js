document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    const studentDetails = document.getElementById('student-details');

    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            const student = data.students.find(s => s.id === parseInt(studentId));
            if (student) {
                const age = calculateAge(student.tanggal_lahir);
                const zodiac = calculateZodiac(student.tanggal_lahir);

                studentDetails.innerHTML = `
                    <img src="${student.foto}" alt="${student.nama}">
                    <h2>${student.nama}</h2>
                    <p><strong>Kelas:</strong> ${student.kelas}</p>
                    <p><strong>Jurusan:</strong> ${student.jurusan}</p>
                    <p><strong>Tanggal Lahir:</strong> ${student.tanggal_lahir}</p>
                    <p><strong>Umur:</strong> ${age} tahun</p>
                    <p><strong>Zodiak:</strong> ${zodiac}</p>
                    <p><strong>Gender:</strong> ${student.gender}</p>
                    <p><strong>Quote:</strong> "${student.quote}"</p>
                    <p><strong>Alamat:</strong> ${student.alamat.jalan}, ${student.alamat.kota}, ${student.alamat.provinsi}, ${student.alamat.kode_pos}</p>
                    <p><strong>Nomor Telepon:</strong> ${student.nomor_telepon}</p>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Deskripsi:</strong> ${student.deskripsi}</p>
                    <h3>Prestasi</h3>
                    <ul>
                        ${student.prestasi.map(p => `<li>${p.judul} (${p.tahun})</li>`).join('')}
                    </ul>
                    <h3>Kegiatan</h3>
                    <ul>
                        ${student.kegiatan.map(k => `<li>${k}</li>`).join('')}
                    </ul>
                    <h3>Extra</h3>
                    <div class="extra-icons">
                        ${renderExtraIcons(student.extra)}
                    </div>
                `;
            } else {
                studentDetails.innerHTML = '<p>Siswa tidak ditemukan</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            studentDetails.innerHTML = '<p>Terjadi kesalahan saat mengambil data siswa. Silakan coba lagi nanti.</p>';
        });
});

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function calculateZodiac(dob) {
    const birthDate = new Date(dob);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const zodiacSigns = [
        "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
        "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
    ];
    const zodiacCutoffs = [20, 19, 21, 21, 21, 21, 23, 23, 23, 23, 22, 22];
    return (day < zodiacCutoffs[month - 1]) ? zodiacSigns[month - 1] : zodiacSigns[month % 12];
}

function renderExtraIcons(extra) {
    const icons = {
        angkatan: 'angkatan-icon.png',
        sekolah: 'sekolah-icon.png',
        osis: 'osis-icon.png',
        pramuka: 'pramuka-icon.png',
        pmr: 'pmr-icon.png'
    };

    return Object.entries(extra)
        .filter(([key, value]) => value)
        .map(([key, value]) => `<img src="images/${icons[key]}" alt="${key} icon" title="${key}">`)
        .join('');
}
