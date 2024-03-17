// 訪問記録
function dateTime(params) {
    //送信ボタンが押された日時の取得
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    
    return `${year}/${month}/${date}`
}

let record = {
"地下鉄博物館" : 0,
"東武博物館" : 0,
"鉄道博物館" : 0,
"原鉄道模型博物館" : 0
};
let show = "";
let total = 0;

function academy() {

    const sentStrTotal = localStorage.getItem("total");
    console.log(typeof sentStrTotal);
    const sentTotal = Number(sentStrTotal);

    if (sentTotal === 3) {
        $("#bachelor").html('<img src="../img/bachelor.png" alt="学士" width="200px">');
    }
    else if (sentTotal === 6) {
        $("#bachelor").html('<img src="../img/bachelor.png" alt="学士" width="200px">');
        $("#master").html('<img src="./img/master.png" alt="修士" width="200px">');
    }
    else if (sentTotal >= 9) {
        $("#bachelor").html('<img src="../img/bachelor.png" alt="学士" width="200px">');
        $("#master").html('<img src="./img/master.png" alt="修士" width="200px">');
        $("#doctor").html('<img src="./img/doctor.png" alt="博士" width="200px">');
    }
}

// 最終学歴ボタンが押されると学位が現れる。
$("#finalEducation").on("click", function(){
    total = JSON.parse(localStorage.getItem("total"));
    console.log({total});
    academy();
})

$("#kiroku").on("click", function() {

    total = JSON.parse(localStorage.getItem("total"));

    // 「記録」をクリックしたら#wentToに1回目のクリックから反映されるために必要
    localStorage.setItem("myRecord", JSON.stringify(record));

    // クリックした数を数えて、その数はlocalStorageに保存される。その値は鉄ちゃんアカデミーに渡される。
    total ++;
    localStorage.setItem("total", total);
    academy();
    
    let element = document.form.museum;
    
    // 値を取得
    let num = element.selectedIndex;
    
    // 上記の値からvalue値を取得
    let selectedMuseum = element.options[num].value;
    
    // 選択した博物館のいった回数をインクリメント
    let parsedRecordNow = JSON.parse(localStorage.getItem("myRecord"));
    for (let element in parsedRecordNow) {
        if (element === selectedMuseum) {
                record[selectedMuseum] = parsedRecordNow[element] + 1;
        }
    }
    
    // 書き込み ※JavaScriptオブジェクト -> JSON文字列に変換
    localStorage.setItem("myRecord", JSON.stringify(record));
    localStorage.setItem("total", JSON.stringify(total));

    //画面に表示
    let show = "";
    for (const museum in record) {
        if (record[museum]) {
            show += museum + ': ' + record[museum] + '回' + '<br>'
        }
    }
    $("#wentTo").html(show);
    console.log({record});
})

// reloadされても最後の記録を表示
if (localStorage.getItem("myRecord")) {
    // 読み込み ※JSON文字列 -> JavaScriptオブジェクトに変換
    record = JSON.parse(localStorage.getItem("myRecord"));

    for (const museum in record) {
    if (record[museum]) {
        show += museum + ': ' + record[museum] + '回' + '<br>'
    }
    }
    $("#wentTo").html(show);
    console.log({record});
}

// 旅のしおりのメモ
//1.Save クリックイベント
$("#save").on("click", function() {
    const value = $("#text_area").val();
    localStorage.setItem("memo", value);
    // alert("Saveしました");
});

//2.clear クリックイベント
$("#clear").on("click", function(){
    localStorage.removeItem("memo");
    // alert("Clearしました");
    $("#text_area").val();
});

//3.ページ読み込み：保存データ取得表示
if(localStorage.getItem("memo")) {
    const value = localStorage.getItem("memo");
    $("#text_area").val(value);
}