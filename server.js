const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

async function increaseFollowers(id, count) {
    console.log(`🚀 ZEPETO 팔로우 증가 시뮬레이션: ID=${id}, count=${count}`);
    return { success: true, message: `${id} 팔로워 ${count}명 증가 완료 (시뮬레이션)` };
}

app.use(cors());
app.use(express.json());
app.use(express.static('frontend')); // frontend 폴더 내 정적 파일 제공

// ✅ 루트 경로로 접속하면 index.html 보여주기
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

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
