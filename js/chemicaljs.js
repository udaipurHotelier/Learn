// Data for housekeeping chemicals
        const chemicals = {
            R1: {
                fullName: "R1: Bathroom Cleaner",
                briefing: "A specialized cleaner for bathrooms.",
                whyUse: "Removes tough stains and disinfects surfaces.",
                howToUse: "Spray on surfaces, scrub, and rinse with water.",
                whereToUse: "Tiles, sinks, toilets, and bathtubs.",
                dilution: "Use undiluted for tough stains or dilute 1:10 with water.",
                usage: "Effective against soap scum, limescale, and germs."
            },
            R2: {
                fullName: "R2: Glass Cleaner",
                briefing: "Designed for cleaning glass surfaces.",
                whyUse: "Gives a streak-free shine to glass.",
                howToUse: "Spray onto glass and wipe with a microfiber cloth.",
                whereToUse: "Windows, mirrors, and glass furniture.",
                dilution: "Ready-to-use, no dilution needed.",
                usage: "Provides a clear, streak-free surface."
            },
            R3: {
                fullName: "R3: Floor Cleaner",
                briefing: "Effective for mopping and floor maintenance.",
                whyUse: "Removes dirt and adds shine to floors.",
                howToUse: "Mix with water and mop the surface.",
                whereToUse: "Marble, tiles, and wooden floors.",
                dilution: "Dilute 1:50 for regular cleaning.",
                usage: "Keeps floors clean and germ-free."
            },
            R4: {
                fullName:"R4: Multi-Purpose Cleaner",
                briefing: "Cleans various surfaces effectively.",
                why: "For versatile cleaning purposes.",
                how: "Apply directly and wipe with a clean cloth.",
                area: "Kitchen counters, tables, and walls.",
                dilution: "1:15 with water.",
                usage: "Removes grease and grime."
            },
			R5: {
                fullName: "R5: Toilet Bowl Cleaner",
                briefing: "Specially formulated for cleaning toilet bowls.",
                why: "Removes stains and kills germs.",
                how: "Pour around the rim and scrub with a toilet brush.",
                area: "Toilet bowls and urinals.",
                dilution: "Ready to use.",
                usage: "Ensures a germ-free and clean toilet bowl."
            },
            R6: {
                fullName: "R6: Degreaser",
                briefing: "Heavy-duty cleaner for grease removal.",
                whyUse: "Removes oil and grease effectively.",
                howToUse: "Apply to greasy surfaces and wipe off with a cloth.",
                whereToUse: "Kitchens, ovens, and industrial equipment.",
                dilution: "Dilute 1:5 for stubborn grease or use undiluted.",
                usage: "Ideal for kitchens and heavy machinery."
            },
            R7: {
                fullName: "R7: Air Freshener",
                briefing: "Keeps spaces smelling fresh.",
                whyUse: "Eliminates odors and freshens the air.",
                howToUse: "Spray directly into the air.",
                whereToUse: "Rooms, bathrooms, and offices.",
                dilution: "Ready-to-use, no dilution needed.",
                usage: "Creates a pleasant and inviting atmosphere."
            },
            R8: {
                fullName: "R8: Carpet Shampoo",
                briefing: "Cleans and refreshes carpets.",
                whyUse: "Removes stains and freshens carpets.",
                howToUse: "Apply, scrub, and vacuum after drying.",
                whereToUse: "Carpets, rugs, and upholstery.",
                dilution: "Dilute 1:10 for best results.",
                usage: "Cleans, brightens, and deodorizes carpets."
            },
            R9: {
                fullName: "R9: Disinfectant Cleaner",
                briefing: "Kills germs and cleans surfaces.",
                whyUse: "Provides effective disinfection.",
                howToUse: "Wipe on surfaces and leave to dry.",
                whereToUse: "Hospitals, kitchens, and general surfaces.",
                dilution: "Dilute 1:20 for general cleaning.",
                usage: "Ensures hygiene and cleanliness."
            }
        };

        const buttonContainer = document.getElementById('buttonContainer');
        const detailsContainer = document.getElementById('detailsContainer');

        // Generate buttons dynamically
        Object.keys(chemicals).forEach(key => {
            const button = document.createElement('button');
            button.className = 'button';
            button.textContent = key;
            button.addEventListener('click', () => showDetails(key, button));
            buttonContainer.appendChild(button);
        });

        // Function to show details
        function showDetails(key, button) {
            // Reset selected button
            document.querySelectorAll('.button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Show details
            const chemical = chemicals[key];
            detailsContainer.innerHTML = `
                <h2>${chemical.fullName}</h2>
                <p><strong>Briefing:</strong> ${chemical.briefing}</p>
                <p><strong>Why use:</strong> ${chemical.whyUse}</p>
                <p><strong>How to use:</strong> ${chemical.howToUse}</p>
                <p><strong>Where to use:</strong> ${chemical.whereToUse}</p>
                <p><strong>How to Dilute:</strong> ${chemical.dilution}</p>
                <p><strong>Usage:</strong> ${chemical.usage}</p>
            `;
            detailsContainer.classList.add('active');
        }