document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Unable to save data');
        }

        const result = await response.json();
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('successMessage').innerText = 'บันทึกสำเร็จ';
        document.getElementById('successMessage').style.color = 'green';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message +'ไม่สามารถบันทึกได้');
    }
});
