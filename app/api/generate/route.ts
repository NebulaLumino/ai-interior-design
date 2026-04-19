import { NextRequest, NextResponse } from 'next/server';

let _client: any = null;
async function getClient() {
  if (!_client) {
    const { default: OpenAI } = await import('openai');
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://api.deepseek.com/v1' });
  }
  return _client;
}

export async function POST(req: NextRequest) {
  try {
    const { room_function, style_preference, spatial_constraints, budget_tier } = await req.json();
    const client = await getClient();

    const prompt = `You are an expert interior designer. Create a comprehensive room design concept based on the following parameters:

**Room Function:** ${room_function || 'Multi-purpose living space'}
**Style Preference:** ${style_preference || 'Modern minimalist'}
**Spatial Constraints:** ${spatial_constraints || 'Standard room dimensions'}
**Budget Tier:** ${budget_tier || 'Mid-range'}

Provide a complete interior design package:

## ROOM LAYOUT RECOMMENDATION
Detailed floor plan description including:
- Furniture placement and arrangement
- Traffic flow optimization
- Zone definitions (activity zones, relaxation zones)
- Sight lines and focal points
- Dimension recommendations

## MOOD BOARD DESCRIPTION
Define the complete aesthetic:
- **Color palette:** 5-color scheme with specific tones (wall, accent, furniture, textile, accessory)
- **Texture story:** Mix of materials (wood, metal, fabric, stone, glass)
- **Lighting plan:** Ambient, task, and accent lighting breakdown
- **Visual mood:** How the space should feel

## FURNITURE & FIXTURE SELECTION
For each area/zone recommend:
- Key furniture pieces with style characteristics
- Built-in fixtures if applicable
- Window treatments
- Flooring recommendations
- Rug and textile suggestions

## MATERIAL SPECIFICATIONS
- Wall finishes and treatments
- Countertop/furniture surface materials
- Metal finishes (brushed nickel, brass, matte black, etc.)
- Wood species and finishes

## DECOR & ACCESSORY PLAN
- Art and wall decor placement
- Plant suggestions (type and placement)
- Decorative accessories by zone
- Personalization touches

## LIGHTING SCHEDULE
Full lighting specification:
- Overhead/ambient: fixture type, wattage, placement
- Task lighting: specific areas and fixture types
- Accent lighting: architectural features, art, plants
- Smart lighting suggestions

## BUDGET TIER BREAKDOWN
Prioritized shopping list with:
- High-impact vs. low-cost items
- DIY vs. professional installation
- Where to invest vs. where to save

Include specific style references (e.g., "mid-century modern," "Japandi," "Bohemian industrial") and explain why each choice fits the overall concept.`;

    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
