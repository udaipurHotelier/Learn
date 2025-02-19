
	    function previewLogo() {
        const file = document.getElementById('logoUpload').files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const logoPreview = document.getElementById('logoPreview');
            logoPreview.style.display = 'block';
            logoPreview.src = e.target.result;
            updatePreview();
        };

        if (file && file.type === 'image/png') {
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a PNG file.");
        }
    }

    document.getElementById('offerLetterForm').addEventListener('input', function() {
        updatePreview();
        validateForm();
    });

    function validateForm() {
        const inputs = document.querySelectorAll('#offerLetterForm input');
        const downloadButton = document.getElementById('downloadButton');

        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

        if (allFilled) {
            downloadButton.classList.remove('disabled');
            downloadButton.disabled = false;
        } else {
            downloadButton.classList.add('disabled');
            downloadButton.disabled = true;
        }
    }

    function updatePreview() {
        const fullName = document.getElementById('fullName').value;
        const location = document.getElementById('location').value;
        const department = document.getElementById('department').value;
        const joiningDate = document.getElementById('joiningDate').value;
        const hrName = document.getElementById('hrName').value;
        const companyName = document.getElementById('companyName').value;

        const currentDate = new Date();
        const formattedDate = currentDate.getDate().toString().padStart(2, '0') + '/' + 
                              (currentDate.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                              currentDate.getFullYear().toString().slice(-2);

        const joiningDateFormatted = new Date(joiningDate);
        const formattedJoiningDate = joiningDateFormatted.getDate().toString().padStart(2, '0') + '/' + 
                                      (joiningDateFormatted.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                                      joiningDateFormatted.getFullYear().toString().slice(-2);

        const logoImg = document.getElementById('logoPreview');

        const offerLetter = `
${logoImg.style.display === 'block' ? '<img src="' + logoImg.src + '" width="100" height="75">' : ''}

Date: ${formattedDate}

Mr. ${fullName}
${location}

Subject: Letter of Intent for the position of ${department}

Dear Mr. ${fullName},

Further to the interview/discussions that we had, we are pleased to offer you the above-stated position on the terms and conditions that have been discussed and mutually agreed.

You are required to join your duties on or before ${formattedJoiningDate}.

Please carry the following documents at the time of your joining:
1. Educational & Qualification Certificates.
2. Experience & Relieving certificates of the last employers.
3. Salary slips from the last Employers.
4. Five passport size photographs.
5. Copy of pan card.
6. Copy of Aadhar card.
7. Cancel Cheque or Bank Passbook.

With best wishes,



Mr. ${hrName}
Unit Head HR,
${companyName}
`;

        document.getElementById('letterOutput').innerHTML = offerLetter;

        document.getElementById('downloadButton').onclick = function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const logoData = logoImg.style.display === 'block' ? logoImg.src : null;

            if (logoData) {
                doc.addImage(logoData, 'PNG', 10, 10, 50, 25);
            }

            const text = offerLetter.replace(/<img[^>]*>/g, '').trim();
            doc.text(text, 10, 50, { maxWidth: 190 });
            doc.save(`Offer_Letter_${fullName.replace(/\s+/g, '_')}.pdf`);
        };
    }
	