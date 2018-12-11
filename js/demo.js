window.onload = function () {
    let btnStart = document.getElementById('btn');
    let box = document.getElementById('box');
    let flayBox = document.getElementsByClassName('context')[0];
    let score = document.getElementById('score');
    let originLei;
    let minLei;
    let qiImgNum;
    let block;
    let tempArr = [];

    bindEvent();
    function bindEvent() {
        btnStart.onclick = function () {
            box.style.display = 'block';
            flayBox.style.display = 'block';
            init();
        }
        box.oncontextmenu = function () {
            return false;
        }
        box.onmousedown = function (e) {
            let event = e || window.event;
            let target = event.target || event.srcElement;
            if (event.which == 1) {
                leftClick(target);
            } else if (event.which == 3) {
                rightClick(target);
            }
        }
    }
    function rightClick(dom) {
        
        if (dom.classList.contains('num')) {
            return;
        }
        dom.classList.toggle('qiImg');

        if (dom.classList.contains('qiImg')) {
            qiImgNum--;
        } if (!dom.classList.contains('qiImg')) {
            qiImgNum++;
        }
        if (dom.classList.contains('isLei') && dom.classList.contains('qiImg')) {
            minLei--;
        } if (dom.classList.contains('isLei') && !dom.classList.contains('qiImg')) {
            minLei++;
        }
        score.innerHTML = qiImgNum;
        if (minLei == 0) {
            alert('恭喜你，你赢了');
            location.reload();
        }




    }
    function leftClick(dom) {
        let isLei = document.getElementsByClassName('isLei');
        if (dom && dom.classList.contains('isLei')) {
            for (let i = 0; i < isLei.length; i++) {
                isLei[i].classList.add('show');
            }
            setTimeout(function () {
                alert("游戏结束，请重新开始！");
                location.reload();
            }, 100)

        } else {
            let n = 0;

            let temp = dom && dom.getAttribute('id').split('-');
            let posX = Number(temp[0]);
            let posY = Number(temp[1]);
            let tempDom;
            let nearBox;
            dom.classList.add('num');
            for (let i = posX - 1; i <= posX + 1; i++) {
                for (let j = posY - 1; j <= posY + 1; j++) {
                    tempDom = document.getElementById(i + '-' + j);
                    if (tempDom && tempDom.classList.contains('isLei')) {
                        n++;
                    }
                }
            }
            dom && (dom.innerHTML = n);
            if (n == 0) {
                for (let i = posX - 1; i <= posX + 1; i++) {
                    for (let j = posY - 1; j <= posY + 1; j++) {
                        nearBox = document.getElementById(i + '-' + j);
                        if (nearBox && nearBox.length != 0) {
                            if (!nearBox.classList.contains('check')) {
                                nearBox.classList.add('check');
                                leftClick(nearBox);
                            }
                        }

                    }
                }
            }
        }
    }
    function init() {

        originLei = 10;
        minLei = 10;
        qiImgNum = 10;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let dom = document.createElement('div');
                dom.classList.add('block');
                dom.setAttribute('id', i + '-' + j);
                tempArr.push({ mine: 0 });
                box.appendChild(dom);
            }
        }
        block = document.getElementsByClassName('block');
        while (originLei) {
            let mineIndex = Math.floor(Math.random() * 100);
            if (tempArr[mineIndex].mine === 0) {
                tempArr[mineIndex].mine = 1;
                block[mineIndex].classList.add('isLei');
                originLei--;
            }
        }
    }
}
