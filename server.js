const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// 팔로워 증가 시뮬레이션 함수
async function increaseFollowers(id, count) {
    console.log(`🚀 ZEPETO 팔로우 증가 시뮬레이션: ID=${id}, count=${count}`);
    return { success: true, message: `${id} 팔로워 ${count}명 증가 완료 (시뮬레이션)` };
}

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('frontend')); // 정적 파일 경로 설정

// index.html 서빙
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// API 라우트
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

// 포트 열기
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
