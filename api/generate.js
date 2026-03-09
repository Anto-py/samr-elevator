export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { activity, lang } = req.body;
  if (!activity || typeof activity !== 'string' || activity.trim().length === 0) {
    return res.status(400).json({ error: 'Missing activity' });
  }

  const isEn = lang === 'en';

  const prompt = isEn
    ? `You are an expert in digital pedagogy and the SAMR model (Puentedura).

Starting activity: "${activity.trim()}"

Generate the 4 SAMR versions of this activity. Reply ONLY with valid JSON, no text before or after, no backticks. Exact format:
{
  "S": "Concrete description of the Substitution version (2-3 sentences, with specific tool named)",
  "A": "Concrete description of the Augmentation version (2-3 sentences, with specific features)",
  "M": "Concrete description of the Modification version (2-3 sentences, with tool and significant task change)",
  "R": "Concrete description of the Redefinition version (2-3 sentences, new task impossible without technology)"
}

Be concrete, practical, adapted to secondary or vocational education.
Favour these tools when relevant (you can also use others): Microsoft 365 (Word, Teams, Forms, OneNote, PowerPoint…), Canva, Wooclap, Wooflash, BookWidgets.
Add a light touch of pedagogical enthusiasm in the tone — not excessive, just enough to make it worth trying.`
    : `Tu es un expert en pédagogie numérique et en modèle SAMR (Puentedura).

Activité de départ : "${activity.trim()}"

Génère les 4 versions SAMR de cette activité. Réponds UNIQUEMENT en JSON valide, sans texte avant ou après, sans backticks. Format exact :
{
  "S": "Description concrète de la version Substitution (2-3 phrases, avec outil spécifique nommé)",
  "A": "Description concrète de la version Augmentation (2-3 phrases, avec fonctionnalités spécifiques)",
  "M": "Description concrète de la version Modification (2-3 phrases, avec outil et changement de la tâche)",
  "R": "Description concrète de la version Redéfinition (2-3 phrases, tâche inédite impossible sans tech)"
}

Sois concret, pratique, adapté à l'enseignement secondaire ou professionnel.
Privilégie ces outils quand c'est pertinent (tu peux aussi en utiliser d'autres) : Microsoft 365 (Word, Teams, Forms, OneNote, PowerPoint…), Canva, Wooclap, Wooflash, BookWidgets.
Glisse une touche légère et subtile d'enthousiasme pédagogique dans le ton — sans excès, juste assez pour que ça donne envie d'essayer.`;

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!anthropicRes.ok) {
    const err = await anthropicRes.text();
    return res.status(anthropicRes.status).json({ error: 'Anthropic API error', detail: err });
  }

  const data = await anthropicRes.json();
  const text = data.content.map(b => b.text || '').join('');
  const clean = text.replace(/```json|```/g, '').trim();

  try {
    const result = JSON.parse(clean);
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ error: 'JSON parse error', raw: text });
  }
}
