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
    <div class="prof-grad">
        <div class="header-detail-prof">
            <button class="header-button" onclick="window.history.back()"><i class="fas fa-arrow-left"></i></button>
            <span class="header-text">Detail</span>
            <button class="header-button"><i class="fas fa-share"></i></button>
        </div>
    </div>
    <div class="profile-image">
        <img src="${student.foto}" alt="${student.nama}">
    </div>
        <div class="ttd">
        <p>${age} ${zodiac}</p>
    </div>
    <div class="profile-header">

        <div class="prof-student">
            <h1>${student.nama}</h1>

        </div>
    </div>
    <div class="prof-agez">
        <p>${age} ${zodiac}</p>
        <p class="profile-meta"><strong></strong> ${student.kelas} ${student.jurusan}</p>
    </div>


    <div class="extra">

        <p class="profile-bio">${student.quote}</p>

        
            <div class="row-bottom" style="display: none;">
                <span class="followers-count">
                    Followers
                    <span class="count-meta">10K</span>
                </span>
                <span class="following-count">
                    Following
                    <span class="count-meta">6K</span>

                </span>
                <span class="likes-count">
                    Likes
                    <span class="count-meta">512</span>
                </span>
            </div>
            <div class="button-container" style="display: none;">
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
                    <div class="friends">
                        <h3>Teman</h3>
                        <div class="friends-list">
                            ${renderFriends(data.students, student.teman)}
                        </div>
                    </div>
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
<div class="title-section">
            <h3>Extra</h3>
            <div class="extra-icons">
                ${renderExtraIcons(student.extra)}
            </div>
        </div>

        <div id="Tab3" class="tab-content">
            <div class="contact-info">
                <div class="card">
                    <div class="card-name">Quote of the month</div>
                    <div class="quote">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 330 307" height="80"
                            width="80">
                            <path fill="currentColor"
                                d="M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z">
                            </path>
                        </svg>
                    </div>
                    <div class="body-text">${student.deskripsi}</div>
                    <div class="author">- by Virgil <br> <span>(Latin poet)</span> <svg height="" width="18"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H24V24H0z" fill="none"></path>
                            <path
                                d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z">
                            </path>
                        </svg>
                    </div>
                </div>
                <h3>Kontak</h3>
                <p><strong>Nomor Telepon:</strong> ${student.nomor_telepon}</p>
                <p><strong>Email:</strong> ${student.email}</p>
            </div>
            <div class="description">
                <h3>Deskripsi</h3>
                <p>${student.deskripsi}</p>
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