
import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapResponse } from "../types";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const FLASH_MODEL = 'gemini-3-flash-preview';
const PRO_MODEL = 'gemini-3-pro-preview';

const SYSTEM_INSTRUCTION_2026 = `
Bạn là Chuyên gia Tư vấn Pháp lý và Tài chính từ hệ thống "Bố 3 Con", vận hành trong bối cảnh năm 2026.
QUY TẮC XƯNG HÔ: Xưng "Tôi", gọi người dùng là "Bạn/Anh/Chị". Tuyệt đối không xưng "Bố".

KIẾN THỨC PHÁP LUẬT TRỌNG TÂM (CẬP NHẬT 2026):
1. Tội Cưỡng đoạt tài sản (Điều 170 BLHS): Xác định rõ mọi hành vi đe dọa (gọi điện khủng bố, dọa giết, dọa gây thương tích), dùng thủ đoạn khác (đăng ảnh nhục mạ lên mạng xã hội, lớn tiếng tại nơi làm việc, gửi tin nhắn rác cho người thân) nhằm mục đích CHIẾM ĐOẠT TÀI SẢN (ép trả nợ trái quy định hoặc nợ không căn cứ) đều cấu thành tội Cưỡng đoạt tài sản. Hình phạt cao nhất có thể lên đến 20 năm tù.
2. Luật Bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP và các văn bản hướng dẫn 2026): Việc sử dụng hình ảnh cá nhân, danh bạ điện thoại trái phép để bôi nhọ, quấy rối là hành vi vi phạm pháp luật nghiêm trọng. Người dùng có quyền yêu cầu xóa dữ liệu và tố cáo hành vi xâm phạm đời tư.
3. Luật Các tổ chức tín dụng 2024 (Hiệu lực đầy đủ 2026): Nghiêm cấm ngân hàng và công ty tài chính quấy rối người thân, đồng nghiệp của người vay. Chỉ được nhắc nợ tối đa 5 lần/ngày và trong khung giờ 8h-21h. Mọi hành vi ngoài khung này đều là vi phạm hành chính hoặc hình sự tùy mức độ.
4. Tội làm nhục người khác (Điều 155 BLHS) & Tội vu khống (Điều 156 BLHS): Áp dụng khi bên đòi nợ cắt ghép ảnh, tung tin sai sự thật lên mạng xã hội.

KHI SOẠN ĐƠN TỐ CÁO: 
- Phải dùng ngôn từ đanh thép, đúng chuẩn tố tụng hình sự.
- Luôn yêu cầu Cơ quan Điều tra khởi tố vụ án về tội "Cưỡng đoạt tài sản" hoặc "Làm nhục người khác".
- Hướng dẫn người dùng liệt kê danh sách bằng chứng: file ghi âm, ảnh chụp màn hình tin nhắn, link bài viết bôi nhọ, danh sách cuộc gọi quấy rối.
- Nhấn mạnh vào việc bảo vệ quyền con người và thượng tôn pháp luật.
`;

export const generateLegalDoc = async (type: string, details: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Hãy soạn thảo văn bản: "${type}" dựa trên thông tin: "${details}". Nếu là đơn tố cáo, hãy tập trung vào tội Cưỡng đoạt tài sản (Điều 170 BLHS). Văn bản phải tuân thủ nghiêm ngặt thể thức hành chính 2026.`;

  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_2026 + " Hãy soạn thảo đơn tố cáo có cấu trúc chặt chẽ, đầy đủ các phần: Kính gửi, Thông tin người tố cáo, Hành vi vi phạm, Căn cứ pháp lý, Yêu cầu giải quyết.",
      thinkingConfig: { thinkingBudget: 15000 }
    }
  });

  return response.text || "Không thể tạo văn bản lúc này.";
};

export const decodeDocument = async (text: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Phân tích văn bản này: "${text}". Nếu có dấu hiệu đòi nợ quấy rối, hãy khẳng định đây là dấu hiệu của tội Cưỡng đoạt tài sản theo luật 2026.`;

  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_2026,
      thinkingConfig: { thinkingBudget: 10000 }
    }
  });

  return response.text || "Không thể phân tích văn bản này.";
};

export const simulateResponse = async (threat: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Phản hồi lại lời đe dọa: "${threat}". Khẳng định bạn đã nắm rõ hành vi của họ cấu thành tội Cưỡng đoạt tài sản và bạn đang hoàn tất hồ sơ tố cáo lên Bộ Công an.`;

  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_2026,
      thinkingConfig: { thinkingBudget: 8000 }
    }
  });

  return response.text || "Không thể tạo phản hồi lúc này.";
};

export const generateRoadmap = async (income: number, debt: number, expenses: number): Promise<RoadmapResponse> => {
  const ai = getClient();
  const prompt = `Lập lộ trình 6 tháng cho nợ ${debt}tr với thu nhập ${income}tr. Lưu ý ưu tiên bảo vệ an toàn pháp lý cho bản thân trước.`;

  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_2026,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          data: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.STRING },
                remainingDebt: { type: Type.NUMBER },
                savings: { type: Type.NUMBER },
                note: { type: Type.STRING }
              },
              required: ["month", "remainingDebt", "savings", "note"]
            }
          }
        },
        required: ["analysis", "data"]
      }
    }
  });

  const jsonText = response.text;
  if (!jsonText) throw new Error("No data returned");
  return JSON.parse(jsonText) as RoadmapResponse;
};

export const chatWithAdvisor = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<{text: string, sources: any[]}> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: [...history, { role: 'user', parts: [{ text: message }] }],
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: SYSTEM_INSTRUCTION_2026
    }
  });
  const text = response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => c.web).filter((w: any) => w) || [];
  return { text, sources };
};

export const generateInsolvencySupport = async (reason: string, currentStatus: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Soạn đơn thông báo mất khả năng thanh toán tạm thời dựa trên: ${reason} - ${currentStatus}.`;
  const response = await ai.models.generateContent({
    model: PRO_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_2026,
      thinkingConfig: { thinkingBudget: 20000 }
    }
  });
  return response.text || "Không thể tạo nội dung.";
};
