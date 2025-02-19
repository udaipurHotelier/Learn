 // Handle logo upload
        document.getElementById('employerLogo').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('logoPreview');
                    preview.src = e.target.result;
                    preview.style.display = 'inline-block';
                }
                reader.readAsDataURL(file);
            }
        });

        // Live preview updates
        function updatePreview(inputId, previewId) {
            const input = document.getElementById(inputId);
            const preview = document.getElementById(previewId + 'Preview');
            
            input.addEventListener('input', function() {
                preview.textContent = this.value;
                calculateSalary();
            });
        }

        // Update all preview fields
        const fields = [
            'employerName', 'employerAddress', 'empCode', 'empName', 
            'department', 'designation', 'dateOfJoining', 'payPeriod',
            'salAdv', 'loans', 'uanNumber', 'esiNumber', 'monthDays', 'paidDays'
        ];

        fields.forEach(field => updatePreview(field, field));

        // Add event listeners for total salary and compliance
        document.getElementById('totalSalary').addEventListener('input', calculateSalary);
        document.getElementById('applicableForCompliance').addEventListener('change', calculateSalary);
        document.getElementById('monthDays').addEventListener('change', calculateSalary);
        document.getElementById('paidDays').addEventListener('input', calculateSalary);

        function calculateSalary() {
            const totalSalary = Number(document.getElementById('totalSalary').value) || 0;
            const isCompliant = document.getElementById('applicableForCompliance').value === 'yes';
            const monthDays = Number(document.getElementById('monthDays').value) || 30;
            const paidDays = Number(document.getElementById('paidDays').value) || monthDays;
            
            let basic = Math.round((totalSalary * 0.5 * paidDays) / monthDays);
            let hra = Math.round((totalSalary * 0.3 * paidDays) / monthDays);
            let washingAllow = Math.round(((totalSalary - (totalSalary * 0.5) - (totalSalary * 0.3)) * paidDays) / monthDays);

            let pf = 0;
            let esic = 0;

            if (isCompliant) {
                pf = Math.round(basic * 0.12);
                esic = Math.round((totalSalary * paidDays / monthDays) * 0.0075);
            }

            document.getElementById('basicPreview').textContent = basic;
            document.getElementById('hraPreview').textContent = hra;
            document.getElementById('washingAllowPreview').textContent = washingAllow;

            document.getElementById('pfPreview').textContent = pf;
            document.getElementById('esicPreview').textContent = esic;

            document.getElementById('pfRow').style.display = isCompliant ? '' : 'none';
            document.getElementById('esicRow').style.display = isCompliant ? '' : 'none';

            const salAdv = Number(document.getElementById('salAdv').value) || 0;
            const loans = Number(document.getElementById('loans').value) || 0;

            const totalEarnings = basic + hra + washingAllow;
            const totalDeductions = pf + esic + salAdv + loans;
            const netSalary = totalEarnings - totalDeductions;

            document.getElementById('totalEarningsPreview').textContent = totalEarnings;
            document.getElementById('totalDeductionsPreview').textContent = totalDeductions;
            document.getElementById('grossSalaryPreview').textContent = Math.round((totalSalary * paidDays) / monthDays);
            document.getElementById('netSalaryPreview').textContent = netSalary;

            document.getElementById('uanNumberPreview').textContent = document.getElementById('uanNumber').value;
            document.getElementById('esiNumberPreview').textContent = document.getElementById('esiNumber').value;
            document.getElementById('monthDaysPreview').textContent = monthDays;
            document.getElementById('paidDaysPreview').textContent = paidDays;

            document.getElementById('netSalaryWords').textContent = `Net Salary in words: ${numberToWords(netSalary)} Rupees Only`;
        }

        function numberToWords(number) {
            const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            
            if (number === 0) return 'Zero';
            
            function convertLessThanOneThousand(n) {
                if (n < 20) return units[n];
                const digit = n % 10;
                if (n < 100) return tens[Math.floor(n/10)] + (digit ? ' ' + units[digit] : '');
                return units[Math.floor(n/100)] + ' Hundred' + (n % 100 ? ' and ' + convertLessThanOneThousand(n % 100) : '');
            }
            
            const thousand = Math.floor(number / 1000);
            const remainder = number % 1000;
            
            if (thousand === 0) return convertLessThanOneThousand(remainder);
            
            return convertLessThanOneThousand(thousand) + ' Thousand' + (remainder ? ' ' + convertLessThanOneThousand(remainder) : '');
        }

        function validateForm() {
            const form = document.querySelector('form');
            return form.checkValidity();
        }

        function generatePDF() {
            if (!validateForm()) {
                alert('Please fill in all required fields correctly.');
                return;
            }
            calculateSalary();
            const element = document.getElementById('salary-slip');
            
            // Create a canvas element to add the watermark
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions
            canvas.width = element.offsetWidth;
            canvas.height = element.offsetHeight;
            
            // Draw the salary slip content onto the canvas
            html2canvas(element).then(function(salarySlipCanvas) {
                ctx.drawImage(salarySlipCanvas, 0, 0);
                
                // Add watermark
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                ctx.rotate(-Math.PI / 6);
                ctx.fillText('Udaipur Hotelier', canvas.width, canvas.height);
                
                // Convert canvas to image
                const imgData = canvas.toDataURL('image/png');
                
                // Generate PDF
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('salary-slip.pdf');
            });
        }
		