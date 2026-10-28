"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const EMAIL = "juanmaarmero30@gmail.com";

const testimonials = [
  {
    quote:
      "Se destaca por la entrega y dedicación en la labor encomendada, tiene una gran capacidad para solucionar de manera eficaz los problemas que se presentan.",
    name: "Angela Patricia",
    role: "Abogada",
  },
  {
    quote:
      "Juanma es una persona inteligente, comprometida, responsable y muy profesional en todo lo que hace. Además, es íntegra, con buenos valores y ética profesional.",
    name: "Jhon Urbano",
    role: "Jefe de Interventoría",
  },
];

function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= value ? "fill-brand-600 text-brand-600" : "text-brand-200"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [rating, setRating] = useState(5);

  // Sin backend: el formulario abre el correo con el testimonio ya redactado.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Testimonio de ${f.get("name")}`;
    const body = `Nombre: ${f.get("name")}\nCargo / Rol: ${f.get("role")}\nCalificación: ${rating}/5\n\n${f.get("message")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-ink placeholder:text-muted/60 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200";

  return (
    <section id="testimonials" className="section bg-white">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
            Qué dicen de mí
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Opiniones de profesores, compañeros y clientes sobre mi trabajo y dedicación.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-brand-50 p-8">
                <Stars value={5} />
                <blockquote className="mt-4 text-lg leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 font-display font-bold text-white">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-900">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="self-start rounded-3xl border-2 border-brand-700 p-8"
          >
            <h3 className="font-display text-2xl font-bold text-brand-900">
              Deja tu testimonio
            </h3>
            <p className="mt-2 text-muted">
              ¿Trabajaste conmigo o tomaste alguna clase juntos? Me encantaría escuchar tu opinión.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium">
                Nombre
                <input name="name" required className={field} />
              </label>
              <label className="block text-sm font-medium">
                Cargo / Rol
                <input name="role" required className={field} />
              </label>

              <fieldset>
                <legend className="text-sm font-medium">Calificación</legend>
                <div className="mt-1.5 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      aria-label={`${n} estrellas`}
                      aria-pressed={rating === n}
                      className="rounded p-0.5"
                    >
                      <Star
                        size={26}
                        className={n <= rating ? "fill-brand-600 text-brand-600" : "text-brand-200"}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block text-sm font-medium">
                Mensaje
                <textarea name="message" required rows={4} className={field} />
              </label>
            </div>

            <button type="submit" className="btn btn-primary mt-6 w-full">
              Enviar testimonio
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
