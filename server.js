const express = require('express');
const app = express();
const cors = require('cors');

// 시뮬레이션용 팔로워 증가 함수
async function increaseFollowers(id, count) {
    console.log(`🚀 ZEPETO 팔로우 증가 시뮬레이션: ID=${id}, count=${count}`);
    return { success: true, message: `${id} 팔로워 ${count}명 증가 완료 (시뮬레이션)` };
}

// CORS 및 JSON 파싱
app.use(cors());
app.use(express.json());

// frontend 폴더를 정적 경로로 설정
app.use(express.static('frontend'));

// ✅ 루트 경로에서 status 텍스트 반환 제거 (index.html을 보여주도록)
    // app.get('/', (req, res) => {
    //     res.send('서버가 Render에서 정상 작동 중입니다!');
    // });

// 팔로워 요청 API
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

// 포트 설정 및 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

