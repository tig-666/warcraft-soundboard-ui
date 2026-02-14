const fs = require("fs");
const path = require("path");


/* =========================
   Helpers
========================= */

function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

function formatLabel(filename) {
    const name = filename.replace(/\.[^/.]+$/, "");

    let nameWithSpaces = name.replace(/([a-z])([A-Z0-9])/g, "$1 $2");

    nameWithSpaces = nameWithSpaces.replace(
        /([A-Z])([A-Z][a-z])/g,
        "$1 $2"
    );

    return nameWithSpaces;
}

/* =========================
   Core
========================= */

function generateRaceJson(raceFolder) {
    const raceName = path.basename(raceFolder);

    const raceObj = {
        name: raceName,
        characters: []
    };

    const characters = fs.readdirSync(raceFolder);

    for (const charName of characters) {
        const charPath = path.join(raceFolder, charName);

        if (!fs.statSync(charPath).isDirectory()) continue;

        const characterObj = {
            name: formatLabel(charName),
            image: "",
            audios: []
        };

        const files = fs.readdirSync(charPath);

        for (const fileName of files) {
            if (!fileName.toLowerCase().endsWith(".wav")) continue;

            const baseName = fileName.replace(/\.[^/.]+$/, "");

            const cleanedName = baseName.replace(
                new RegExp(`^${charName}`, "i"),
                ""
            );

            const formatted = formatLabel(cleanedName);

            const label = formatted
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const audioId = `${slugify(raceName)}-${slugify(
                charName
            )}-${slugify(fileName.replace(/\.[^/.]+$/, ""))}`;

            characterObj.audios.push({
                id: audioId,
                label,
                file: `/audio/${raceName}/${charName}/${fileName}`,
                transcription: ""
            });
        }

        characterObj.audios.sort((a, b) =>
            a.label.localeCompare(b.label)
        );

        raceObj.characters.push(characterObj);
    }

    return raceObj;
}

function addRaceToJson(raceFolder, outputFile = "wc3_audios.json") {
    const raceData = generateRaceJson(raceFolder);

    if (fs.existsSync(outputFile)) {
        raceData = JSON.parse(fs.readFileSync(outputFile, "utf-8"));
    }

    fs.writeFileSync(
        outputFile,
        JSON.stringify(raceData, null, 2),
        "utf-8"
    );

    console.log(`✅ Raza '${raceData.name}' agregada a ${outputFile}`);
}

/* =========================
   CLI
========================= */

const args = process.argv.slice(2);

if (!args[0]) {
    console.log("❌ Debes pasar la ruta de la raza.");
    console.log(
        "Ejemplo: node wc3-audio-indexer.js \"C:/ruta/Undead\""
    );
    process.exit(1);
}

const raceFolder = args[0];
const outputFile = args[1] || "wc3_audios.json";

if (!fs.existsSync(raceFolder)) {
    console.log("❌ La ruta especificada no existe.");
    process.exit(1);
}

addRaceToJson(raceFolder, outputFile);
