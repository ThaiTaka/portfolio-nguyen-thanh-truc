"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// API endpoints for sections
app.get('/api/profile', (req, res) => {
    res.json({
        name: 'Nguyễn Thanh Trúc',
        dob: '09/09/2005',
        university: 'Đại Học Đà Lạt',
        major: 'Công nghệ thông tin',
        description: 'Xin chào! Mình là Nguyễn Thanh Trúc, sinh viên năm 3 ngành Công nghệ thông tin tại Đại Học Đà Lạt. Mình đam mê lập trình web, thiết kế UI/UX và luôn tìm kiếm cơ hội phát triển bản thân qua các dự án thực tế. Ngoài việc học, mình còn tham gia nhiều hoạt động ngoại khóa, câu lạc bộ công nghệ, và các dự án cộng đồng để phát triển kỹ năng mềm và mở rộng mối quan hệ.'
    });
});
app.get('/api/skills', (req, res) => {
    res.json([
        'HTML5, CSS3, JavaScript, TypeScript',
        'ReactJS, NextJS, ExpressJS, RESTful API',
        'NodeJS, MongoDB, MySQL, Firebase',
        'UI/UX Design, Figma, Photoshop, Canva',
        'Kỹ năng teamwork, giao tiếp, quản lý thời gian',
        'Khả năng tự học, giải quyết vấn đề, sáng tạo',
        'Làm việc với Git, Github, Agile/Scrum',
        'Tư duy logic, phân tích hệ thống, viết tài liệu kỹ thuật',
        'Thành thạo responsive, tối ưu hiệu suất web',
        'Đã từng tham gia nhiều workshop, hackathon về công nghệ'
    ]);
});
app.get('/api/projects', (req, res) => {
    res.json([
        {
            name: 'Website Portfolio Nakime',
            description: 'Trang web cá nhân giới thiệu bản thân với hiệu ứng động bắt mắt, chế độ sáng tối, tối ưu responsive trên mọi thiết bị. Tích hợp gallery ảnh, hiệu ứng chuyển cảnh mượt mà, và phần giới thiệu chi tiết về kỹ năng, dự án, liên hệ.',
            link: '#'
        },
        {
            name: 'App Quản Lý Công Việc',
            description: 'Ứng dụng quản lý công việc cá nhân, hỗ trợ kéo thả, thông báo deadline, phân loại công việc theo mức độ ưu tiên. Giao diện hiện đại, dễ sử dụng, có chế độ tối ưu cho mobile.',
            link: '#'
        },
        {
            name: 'Blog Chia Sẻ Kiến Thức IT',
            description: 'Blog cá nhân chia sẻ kinh nghiệm học tập, lập trình, UI/UX, các tips về công nghệ và phát triển bản thân. Tích hợp markdown editor, hệ thống bình luận, và hiệu ứng động cho bài viết.',
            link: '#'
        }
    ]);
});
app.get('/api/contact', (req, res) => {
    res.json({
        email: 'nakime.truc@gmail.com',
        facebook: 'https://facebook.com/nakime.truc',
        github: 'https://github.com/nakimetruc',
        phone: '0123 456 789'
    });
});
// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
