const form = document.getElementById('certificateForm');
        const certificate = document.getElementById('certificate');
        const certificateText = document.getElementById('certificateText');
        const hrNameSignature = document.getElementById('hrNameSignature');
        const companyNameSignature = document.getElementById('companyNameSignature');
        const companyLogo = document.getElementById('companyLogo');
        const downloadBtn = document.getElementById('downloadBtn');
        const printedDate = document.getElementById('printedDate');

        form.addEventListener('input', updateCertificate);
        form.addEventListener('change', updateCertificate);

        function updateCertificate() {
            const candidateName = document.getElementById('candidateName').value;
            const department = document.getElementById('department').value;
            const designation = document.getElementById('designation').value;
            const grade = document.getElementById('grade').value;
            const startDate = formatDate(document.getElementById('startDate').value);
            const endDate = formatDate(document.getElementById('endDate').value);
            const companyName = document.getElementById('companyName').value;
            const hrName = document.getElementById('hrName').value;

            certificateText.textContent = `This is to certify that Name ${candidateName} has successfully completed training under ${department} Department as ${designation} designation with ${grade} Grade from ${startDate} to ${endDate} duration of training at ${companyName}.`;

            hrNameSignature.textContent = hrName;
            companyNameSignature.textContent = companyName;

            const today = new Date();
            printedDate.textContent = `Date: ${formatDate(today.toISOString().split('T')[0])}`;
        }

        function formatDate(dateString) {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year.slice(-2)}`;
        }

        document.getElementById('logo').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    companyLogo.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        downloadBtn.addEventListener('click', function() {
            html2canvas(certificate).then(canvas => {
                const link = document.createElement('a');
                link.download = 'training_certificate.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        });

        // Initial update to set the printed date
        updateCertificate();