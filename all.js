let travelData = [];
let travelDataUrl = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

axios.get(travelDataUrl)
  .then(function (response) {
    travelData = response.data.data;
    renderData(travelData);
    filter(travelData);
    addTicket(travelData);
  })

const ticketCardArea = document.querySelector('.ticketCard-area');
const searchResultText = document.querySelector('#searchResult-text');
const cantFindArea = document.querySelector('.cantFind-area');

// data渲染到畫面 & 無資料顯示圖片
function renderData(data) {
  let cardContent = '';
  cantFindArea.style.display = 'none';
  data.forEach((item) => {
    let cardTemplate = `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="${item.name}">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
    cardContent += cardTemplate;
  })
  if (data.length === 0) {
    cantFindArea.style.display = 'block';
  }
  ticketCardArea.innerHTML = cardContent;
  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;
}

const areaFilter = document.querySelector('.regionSearch');

// 篩選功能
function filter(data) {
  areaFilter.addEventListener('change', function () {
    let filterData = [];
    data.forEach((item) => {
      if (areaFilter.value === item.area) {
        filterData.push(item);
      } else if (areaFilter.value === '全部地區') {
        filterData.push(item);
      }
    })
    renderData(filterData);
  })
}

const addTicketBtn = document.querySelector('.addTicket-btn');
const addTicketName = document.querySelector('#ticketName');
const addTicketImgUrl = document.querySelector('#ticketImgUrl');
const addTicketRegion = document.querySelector('#ticketRegion');
const addTicketPrice = document.querySelector('#ticketPrice');
const addTicketNum = document.querySelector('#ticketNum');
const addTicketRate = document.querySelector('#ticketRate');
const addTicketDescriptione = document.querySelector('#ticketDescription');

// 新增卡片 & 簡易驗證
function addTicket(data) {
  addTicketBtn.addEventListener('click', function () {
    let obj = {};
    obj.id = Number(travelData.length);
    obj.name = addTicketName.value.trim();
    obj.imgUrl = addTicketImgUrl.value.trim();
    obj.area = addTicketRegion.value;
    obj.group = Number(addTicketNum.value);
    obj.price = Number(addTicketPrice.value);
    obj.rate = Number(addTicketRate.value);
    obj.description = addTicketDescriptione.value.trim();
    if (!formVerify(obj)) {
      data.push(obj);
      // console.log(data);
      renderData(data);
      areaFilter.value = '全部地區';
    } else {
      return;
    }
  })
}


// 簡易驗證表單
function formVerify(obj) {
  let errorMsg = '';
  if (!obj.name) {
    errorMsg = "套票名稱為必填!";
  } else if (!obj.imgUrl) {
    errorMsg = "圖片網址為必填!";
  } else if (!obj.area) {
    errorMsg = "請選擇地區!";
  } else if (obj.price <= 0) {
    errorMsg = "套票金額必須大於 0!";
  } else if (obj.group < 1) {
    errorMsg = "套票組數必須至少為 1!";
  } else if (obj.rate < 1 || obj.rate > 10) {
    errorMsg = "套票星級必須在 1 至 10 之間!";
  } else if (obj.description.length > 100) {
    errorMsg = "套票描述必填，且不能超過 100 字!";
  }
  if (errorMsg) {
    alert(errorMsg);
    return errorMsg;
  }
}