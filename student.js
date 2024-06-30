document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = parseInt(urlParams.get('id'));
    const studentDetails = document.getElementById('student-details');

    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            const student = data.students.find(s => s.id === studentId);
            if (student) {
                const age = calculateAge(student.tanggal_lahir);
                const zodiac = calculateZodiac(student.tanggal_lahir);

                // Menampilkan informasi siswa utama
                studentDetails.innerHTML = `
                <div class="student-profile">
                <button class="back-button" onclick="window.history.back()">Kembali</button>
                <div class="profile-header">
                    <img src="${student.foto}" alt="${student.nama}" class="profile-image">
                    <div class="prof-student">
                        <h2>${student.nama}</h2>
                        <p class="profile-meta"><strong>Kelas:</strong> ${student.kelas}</p>
                        <p class="profile-meta"><strong>Jurusan:</strong> ${student.jurusan}</p>
                    </div>
                </div>
                <div class="extra">
                

                <p class="profile-meta"><strong></strong> "${student.quote}"</p>
                <div class="extra-icons">
                    ${renderExtraIcons(student.extra)}
                </div><div class="button-container">
    <button class="button-prof follow-button">Follow</button>
    <button class="button-prof share-button">Bagikan</button>
</div>
            </div>
                <div class="tabs">
                <button class="tab-link active" onclick="openTab(event, 'Tab1')"><i class="fas fa-user"></i></button>
                <button class="tab-link" onclick="openTab(event, 'Tab2')"><i class="fas fa-trophy"></i></button>
                <button class="tab-link" onclick="openTab(event, 'Tab3')"><i class="fas fa-address-book"></i></button>
                
                </div>
            
                <div id="Tab1" class="tab-content" style="display: block;">
                    <div class="personal-data">
                        <div class="basic-info">
                            <h3>Informasi Dasar</h3>
                            <p class="profile-meta"><strong>Tanggal Lahir:</strong> ${student.tanggal_lahir}</p>
                            <p class="profile-meta"><strong>Umur:</strong> ${age} tahun</p>
                            <p class="profile-meta"><strong>Zodiak:</strong> ${zodiac}</p>
                            <p class="profile-meta"><strong>Gender:</strong> ${student.gender}</p>
                            
                        </div>
                    </div>
                </div>
            
                <div id="Tab2" class="tab-content">
                    <div class="achievements">
                        <h3>Prestasi</h3>
                        <ul class="achievements-list">
                            ${student.prestasi.map(p => `<li>${p.judul} (${p.tahun})</li>`).join('')}
                        </ul>
                    </div>
                    <div class="activities">
                        <h3>Kegiatan</h3>
                        <ul class="activities-list">
                            ${student.kegiatan.map(k => `<li>${k}</li>`).join('')}
                        </ul>
                    </div>
                    
                </div>
            
                <div id="Tab3" class="tab-content">
                    <div class="contact-info">
                        <h3>Alamat</h3>
                        <p>${student.alamat.jalan}, ${student.alamat.kota}, ${student.alamat.provinsi}, ${student.alamat.kode_pos}</p>
                        <h3>Kontak</h3>
                        <p><strong>Nomor Telepon:</strong> ${student.nomor_telepon}</p>
                        <p><strong>Email:</strong> ${student.email}</p>
                    </div>
                    <div class="description">
                        <h3>Deskripsi</h3>
                        <p>${student.deskripsi}</p>
                    </div>
                    <div class="friends">
                        <h3>Teman</h3>
                        <div class="friends-list">
                            ${renderFriends(data.students, student.teman)}
                        </div>
                    </div>
                </div>
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

function renderExtraIcons(extra) {
    const icons = {
        angkatan: 'pmr-icon.png',
        sekolah: 'pmr-icon.png',
        osis: 'osis-icon.png',
        pramuka: 'pmr-icon.png',
        pmr: 'pmr-icon.png'
    };

    return Object.entries(extra)
        .filter(([key, value]) => value)
        .map(([key, value]) => `<img src="images/${icons[key]}" alt="${key} icon" title="${key}">`)
        .join('');
}

function renderFriends(students, friendsIds) {
    if (!friendsIds || friendsIds.length === 0) {
        return '<p>Tidak ada teman yang ditampilkan.</p>';
    }

    return friendsIds.map(friendId => {
        const friend = students.find(s => s.id === friendId);
        if (friend) {
            return `
                <div class="friend-card" onclick="navigateToStudent(${friend.id})">
                    <img src="${friend.foto}" alt="${friend.nama}">
                    <p>${friend.nama}</p>
                </div>
            `;
        }
        return '';
    }).join('');
}

function navigateToStudent(id) {
    window.location.href = `student.html?id=${id}`;
}

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

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the class 'active' from all tab links
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add 'active' class to the clicked tab link
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
