const DormData = {
  userInfo: {
    admin: { username: "pz1", password: "pz111", role: "admin" },
    N1: { username: "N111", password: "123456", role: "normal", area: "N", floor: "1" },
    N2: { username: "N222", password: "234567", role: "normal", area: "N", floor: "2" },
    N3: { username: "N333", password: "345678", role: "normal", area: "N", floor: "3" },
    N4: { username: "N444", password: "456789", role: "normal", area: "N", floor: "4" },
    N5: { username: "N555", password: "567890", role: "normal", area: "N", floor: "5" },
    N6: { username: "N666", password: "678901", role: "normal", area: "N", floor: "6" },
    S1: { username: "S111", password: "789012", role: "normal", area: "S", floor: "1" },
    S2: { username: "S222", password: "890123", role: "normal", area: "S", floor: "2" },
    S3: { username: "S333", password: "901234", role: "normal", area: "S", floor: "3" },
    S4: { username: "S444", password: "012345", role: "normal", area: "S", floor: "4" },
    S5: { username: "S555", password: "112233", role: "normal", area: "S", floor: "5" },
    S6: { username: "S666", password: "223344", role: "normal", area: "S", floor: "6" }
  },
  initDormData() {
    const savedData = localStorage.getItem("dormSystemData");
    if (savedData) return JSON.parse(savedData);
    const initData = { N: {}, S: {} };
    ["N", "S"].forEach(area => {
      for (let floor = 1; floor <= 6; floor++) {
        initData[area][floor] = {};
        for (let room = 1; room <= 30; room++) {
          const dormNum = `${area}${floor}${String(room).padStart(2, "0")}`;
          initData[area][floor][dormNum] = [];
          for (let i = 0; i < 6; i++) {
            const memberName = `${dormNum}-成员${i+1}`;
            initData[area][floor][dormNum].push({
              name: memberName,
              photo: `images/${dormNum}_${memberName}.png` || "images/default-photo.png", // 优先匹配“宿舍号_姓名.png”，否则用默认图
              status: "正常",
              remark: ""
            });
          }
        }
      }
    });
    localStorage.setItem("dormSystemData", JSON.stringify(initData));
    return initData;
  },
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "{}");
  },
  saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },
  saveTempDorm(temp) {
    localStorage.setItem("tempDorm", JSON.stringify(temp));
  },
  getTempDorm() {
    return JSON.parse(localStorage.getItem("tempDorm") || "{}");
  },
  updateDormData(data) {
    localStorage.setItem("dormSystemData", JSON.stringify(data));
  },
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("复制成功！可粘贴到文档保存");
    }).catch(() => {
      alert("复制失败，请手动复制");
    });
  },
  logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  },
  // 清空当前楼层所有成员状态为“正常”
  clearStatus(area, floor) {
    const dormData = this.initDormData();
    for (const dormNum in dormData[area][floor]) {
      dormData[area][floor][dormNum].forEach(member => {
        member.status = "正常";
        member.remark = "";
      });
    }
    this.updateDormData(dormData);
    alert("本楼层状态已全部清空为正常！");
  }
};
const dormData = DormData.initDormData();