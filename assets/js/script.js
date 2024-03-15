$(document).ready(function () {
    words = [
        { text: "Software", isCognate: true },
        { text: "Algorithm", isCognate: true },
        { text: "Firewall", isCognate: false },
        { text: "Server", isCognate: false },
        { text: "Encryption", isCognate: false },
        { text: "Database", isCognate: true },
        { text: "Memory", isCognate: true },
        { text: "Application", isCognate: true },
        { text: "Cursor", isCognate: true },
        { text: "Icon", isCognate: true },
        { text: "Cable", isCognate: true },
        { text: "Command", isCognate: true },
        { text: "Adapter", isCognate: true },
        { text: "Chat", isCognate: true },
        { text: "Disk", isCognate: true },
        { text: "Hacker", isCognate: false },
        { text: "Record", isCognate: false },
        { text: "Script", isCognate: false },
        { text: "File", isCognate: false },
        { text: "Driver", isCognate: false },
        { text: "Bug", isCognate: false },
        { text: "Button", isCognate: true }
    ];

    function initializeGame() {
        words = shuffle(words); // Embaralha a lista de palavras
        words.forEach((word) => {
            const div = $("<div>", {
                class: "word draggable",
                text: word.text,
                "data-is-cognate": word.isCognate
            });
            $("#word-container").append(div);
        });
        $(".draggable").draggable({
            revert: true
        });
        $(".droppable").droppable({
            drop: function (event, ui) {
                const droppedWord = ui.draggable.text();
                const isCognate = JSON.parse(ui.draggable.attr("data-is-cognate"));
                const isTargetCognate = $(this).attr("id") === "cognates";

                if (isCognate === isTargetCognate) {
                    const wordDiv = $("<div>", {
                        class: "word",
                        text: droppedWord
                    }).css({
                        "border": "2px solid green",
                        "padding": "5px",
                        "margin": "5px"
                    });
                    $(this).addClass("correct").append(wordDiv);
                    ui.draggable.remove();

                    const indexToRemove = words.findIndex(word => word.text === droppedWord);
                    if (indexToRemove !== -1) {
                        words.splice(indexToRemove, 1);
                    }

                    if (words.length === 0) {
                        $("#restart-btn").show();
                    }
                } else {
                    $(this).addClass("incorrect");
                    $("#message").text("Incorreto! Tente novamente.");
                    setTimeout(() => {
                        $(this).removeClass("incorrect");
                        $("#message").text("");
                    }, 1500);
                }
            }
        });
    }

    function resetGame() {
        words = [
            { text: "Software", isCognate: true },
            { text: "Algorithm", isCognate: true },
            { text: "Firewall", isCognate: false },
            { text: "Server", isCognate: false },
            { text: "Encryption", isCognate: false },
            { text: "Database", isCognate: true },
            { text: "Memory", isCognate: true },
            { text: "Application", isCognate: true },
            { text: "Cursor", isCognate: true },
            { text: "Icon", isCognate: true },
            { text: "Cable", isCognate: true },
            { text: "Command", isCognate: true },
            { text: "Adapter", isCognate: true },
            { text: "Chat", isCognate: true },
            { text: "Disk", isCognate: true },
            { text: "Hacker", isCognate: false },
            { text: "Record", isCognate: false },
            { text: "Script", isCognate: false },
            { text: "File", isCognate: false },
            { text: "Driver", isCognate: false },
            { text: "Bug", isCognate: false },
            { text: "Button", isCognate: true }
        ];
        $("#word-container").empty();
        $("#cognates, #false-cognates").empty();
        initializeGame(); 
        $("#restart-btn").hide();
    }

    initializeGame();

    $("#restart-btn").click(resetGame);

    // Função para embaralhar a lista de palavras
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // Enquanto houver elementos para embaralhar
        while (0 !== currentIndex) {
            // Seleciona um elemento restante
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Troca ele pelo elemento atual
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
});
