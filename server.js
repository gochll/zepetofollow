const express = require('express');
const app = express();
const cors = require('cors');

async function increaseFollowers(id, count) {
    console.log(`🚀 ZEPETO 팔로우 증가 시뮬레이션: ID=${id}, count=${count}`);
    return { success: true, message: `${id} 팔로워 ${count}명 증가 완료 (시뮬레이션)` };
}

app.use(cors());
app.use(express.json());
app.use(express.static('frontend')); // 반드시 있어야 함

app.post('/api/follow', async (req, res) => {
    const { id, count } = req.body;
    console.log(`팔로우 요청: ID=${id}, 수=${count}`);
    try {
        const result = await increaseFollowers(id, count);
        return res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: '팔로우 요청 실패', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
