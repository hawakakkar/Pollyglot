export default {
	async fetch(request, env) {
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		const url = new URL(request.url);

		if (request.method === 'POST' && url.pathname === '/api/translate') {
			try {
				const { text, language } = await request.json();
				const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						model: 'openai/gpt-oss-120b:free',
						temperature: 0.5,
						max_tokens: 100,
						messages: [
							{
								role: 'system',
								content: 'You are a translation assistant. Return ONLY the translated text.',
							},
							{
								role: 'user',
								content: `Translate the following text into ${language}: ${text}`,
							},
						],
					}),
				});

				const data = await openRouterResponse.json();

				console.log('OPENROUTER RESPONSE:');
				console.log(JSON.stringify(data));

				if (!openRouterResponse.ok) {
					return Response.json(
						{
							translation: data?.error?.message || 'OpenRouter request failed',
						},
						{
							headers: corsHeaders,
						},
					);
				}

				return Response.json(
					{
						translation: data?.choices?.[0]?.message?.content || 'No translation returned',
					},
					{
						headers: corsHeaders,
					},
				);
			} catch (error) {
				console.error(error);

				return Response.json(
					{
						translation: `ERROR: ${error.message}`,
					},
					{
						status: 500,
						headers: corsHeaders,
					},
				);
			}
		}

		return new Response('Worker Running', {
			headers: corsHeaders,
		});
	},
};
