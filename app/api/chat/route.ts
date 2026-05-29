import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

import { createClient } from "@supabase/supabase-js";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

const supabase =
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(
  req: Request
) {
  try {
    const {
      message,
      userId,
    } =
      await req.json();

    // Fetch activity logs
    const {
      data: activity,
    } = await supabase
      .from("daily_activity")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    // Fetch sleep logs
    const {
      data: sleep,
    } = await supabase
      .from("sleep_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    // Fetch nutrition logs
    const {
      data: nutrition,
    } = await supabase
      .from("nutrition_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    // Gemini model
    const model =
      genAI.getGenerativeModel({
        model:
          "gemini-2.5-flash",
      });

    const result =
      await model.generateContent(`
You are Myra, an AI wellness assistant inside the Vyra wellness platform.

You help users with:
- recovery
- sleep
- nutrition
- hydration
- activity
- stress
- healthy habits

You MUST analyze user wellness logs carefully before answering.

Keep responses:
- concise
- supportive
- personalized
- motivating
- easy to read

Avoid medical diagnosis.

User wellness logs:

Activity Logs:
${JSON.stringify(activity)}

Sleep Logs:
${JSON.stringify(sleep)}

Nutrition Logs:
${JSON.stringify(nutrition)}

User Question:
${message}
`);

    const response =
      result.response.text();

    return Response.json({
      reply: response,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        reply:
          "⚠️ Myra is having trouble connecting right now.",
      },
      {
        status: 500,
      }
    );
  }
}