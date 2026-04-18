import { NextRequest, NextResponse } from 'next/server';
let _clientPromise: Promise<any> | null = null;

async function getClient() {
  if (!_clientPromise) {
    _clientPromise = (async () => {
      const { default: OpenAI } = await import('openai');
      return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.deepseek.com/v1'
      });
    })();
  }
  return _clientPromise;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const f1: string = body.f1 || '';
    const f2: string = body.f2 || '';
    const f3: string = body.f3 || '';
    const f4: string = body.f4 || '';
    const userContent = `Room Function: ${f1}\nStyle Preference: ${f2}\nSpatial Constraints: ${f3}\nBudget Tier: ${f4}`;
    const client = await getClient();
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are an expert interior designer and spatial planner. Given room function, style preference, spatial constraints, and budget tier, generate a comprehensive interior design concept including:空间 organization strategy, furniture selection and placement, color palette and material choices, lighting design approach, style-defining elements and focal points, ways to maximize the space given constraints, budget-conscious alternatives for high-end looks, and how the design supports the room\'s function. Format with clear sections.' },
        { role: 'user', content: userContent },
      ]
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}