const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/api/follow', async (req, res) => {
    const { id, count } = req.body;
    console.log(`팔로우 요청: ID=${id}, 수=${count}`);
    try {
        const result = { success: true, message: `${id} 팔로워 ${count}명 증가 완료 (시뮬레이션)` };
        return res.json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ success: false, message: '에러 발생', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
