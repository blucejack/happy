const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500; // Canvas大小
canvas.height = 500;
// 创建一个数组来存储点的信息
const dots = [];
const dotCount = 300; // 点的数量
const rotationSpeed = 0.005; // 旋转速度
// 初始化随机点
for (let i = 0; i < dotCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 210 + Math.random() * 20;
    const dotSize = Math.random() * 3 + 1;
    dots.push({ angle, radius, dotSize });
}
// 绘制所有随机点的函数
function drawRandomDots() {
    dots.forEach(dot => {
        dot.angle += rotationSpeed; // 更新点的角度，使其旋转
        const x = canvas.width / 2 + dot.radius * Math.cos(dot.angle);
        const y = canvas.height / 2 + dot.radius * Math.sin(dot.angle);

        ctx.beginPath();
        ctx.arc(x, y, dot.dotSize, 0, Math.PI * 2, false);
        ctx.fillStyle = 'pink';
        ctx.fill();
    });
}

// 绘制心形的函数，增加了scale参数来调整大小，并且可以选择是否填充
function drawHeart(scale, fill, offsetX, offsetY) {
    ctx.save(); // 保存当前状态
    ctx.beginPath();
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY); // 移动到画布中心
    ctx.scale(scale, scale); // 根据比例参数缩放
    // 心形的极坐标方程
    for (let i = 0; i < 200; i++) {
        let theta = Math.PI * i / 100 - Math.PI / 2;
        let x = 16 * Math.pow(Math.sin(theta), 3);
        let y = -(13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
        x = x * 10; // 缩放
        y = y * 10; // 缩放
        ctx.lineTo(x, y);
    }
    ctx.closePath(); // 关闭路径
    ctx.strokeStyle = '#ff00aa';
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = '#ff00aa';
        ctx.fill();
    }
    ctx.restore(); // 恢复到保存的状态
}

function drawHeartBLACK(scale, fill, offsetX, offsetY) {
    ctx.save(); // 保存当前状态
    ctx.beginPath();
    ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY); // 移动到画布中心
    ctx.scale(scale, scale); // 根据比例参数缩放
    // 心形的极坐标方程
    for (let i = 0; i < 200; i++) {
        let theta = Math.PI * i / 100 - Math.PI / 2;
        let x = 16 * Math.pow(Math.sin(theta), 3);
        let y = -(13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
        x = x * 10; // 缩放
        y = y * 10; // 缩放
        ctx.lineTo(x, y);
    }
    ctx.closePath(); // 关闭路径
    ctx.strokeStyle = '#ff00aa';
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = '#100f0f';
        ctx.fill();
    }
    ctx.restore(); // 恢复到保存的状态
}
function animateHeartbeat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
    drawRandomDots()
    // 绘制大心形并填充
    drawHeart(1.2, true, 0, 0);
    // 绘制小心形，不填充
    drawHeartBLACK(0.6, true, 0, 0);
    // 添加文本
    ctx.font = '24px Arial'; // 设置字体大小和类型
    ctx.fillStyle = 'red'; // 设置字体颜色为黄色
    ctx.textAlign = 'center'; // 设置文本对齐方式为居中
    ctx.fillText('小芙蓉天天快乐', canvas.width / 2, canvas.height / 2 + 10); // 在心形中心绘制文
}

let scale = 1;
let direction = 1;

function heartbeat() {
    scale += direction * 0.001; // 更新缩放值
    if (scale > 1.1 || scale < 0.9) { // 确定缩放的上下限
        direction = -direction; // 改变缩放方向
    }
    // 设置变换
    ctx.setTransform(scale, 0, 0, scale, canvas.width / 2 * (1 - scale), canvas.height / 2 * (1 - scale));
    // 画两个心形
    animateHeartbeat();
}

function animate() {
    heartbeat();
    requestAnimationFrame(animate); // 循环调用animate函数
}

animate();

