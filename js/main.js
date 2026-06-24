document.addEventListener('DOMContentLoaded', () => {
    const root = document;
    const revealAll = () => {
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    };
    try {
      const IO = window.IntersectionObserver;
      // print buttons
      root
        .querySelectorAll("[data-print]")
        .forEach((b) => b.addEventListener("click", () => window.print()));
      // reveal
      const reveals = root.querySelectorAll("[data-reveal]");
      if (IO) {
        const ro = new IO(
          (ents) => {
            ents.forEach((e) => {
              if (e.isIntersecting) {
                e.target.style.opacity = "1";
                e.target.style.transform = "none";
                ro.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
        reveals.forEach((el) => ro.observe(el));
      } else revealAll();
      setTimeout(revealAll, 2600);
      // count-up
      const fmt = (n, dec, group) => {
        let s = dec > 0 ? n.toFixed(dec) : Math.round(n).toString();
        if (group) {
          const p = s.split(".");
          p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          s = p.join(".");
        }
        return s;
      };
      const animate = (el) => {
        const target = parseFloat(el.getAttribute("data-countup"));
        const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
        const group = el.getAttribute("data-group") !== "0";
        const pre = el.getAttribute("data-pre") || "";
        const suf = el.getAttribute("data-suf") || "";
        const dur = 1500,
          t0 = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          let p = Math.min(1, (now - t0) / dur);
          el.textContent = pre + fmt(target * ease(p), dec, group) + suf;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = pre + fmt(target, dec, group) + suf;
        };
        requestAnimationFrame(step);
      };
      const counts = root.querySelectorAll("[data-countup]");
      if (IO) {
        const co = new IO(
          (ents) => {
            ents.forEach((e) => {
              if (e.isIntersecting) {
                animate(e.target);
                co.unobserve(e.target);
              }
            });
          },
          { threshold: 0.6 },
        );
        counts.forEach((el) => co.observe(el));
      }
      // grow (bars / waterfall)
      const grows = root.querySelectorAll("[data-grow]");
      const doGrow = (el) => {
        const prop = el.getAttribute("data-grow-prop") || "width";
        el.style[prop] = el.getAttribute("data-grow");
      };
      if (IO) {
        const go = new IO(
          (ents) => {
            ents.forEach((e) => {
              if (e.isIntersecting) {
                doGrow(e.target);
                go.unobserve(e.target);
              }
            });
          },
          { threshold: 0.25 },
        );
        grows.forEach((el) => go.observe(el));
      } else grows.forEach(doGrow);
      // dash (donut)
      const dashes = root.querySelectorAll("[data-dash]");
      const doDash = (el) => {
        el.style.strokeDashoffset = el.getAttribute("data-dash");
      };
      if (IO) {
        const dz = new IO(
          (ents) => {
            ents.forEach((e) => {
              if (e.isIntersecting) {
                doDash(e.target);
                dz.unobserve(e.target);
              }
            });
          },
          { threshold: 0.3 },
        );
        dashes.forEach((el) => dz.observe(el));
      } else dashes.forEach(doDash);
      // sticky nav + scrollspy
      const nav = root.getElementById("atlasNav");
      const hero = root.getElementById("atlasHero");
      const links = nav ? Array.from(nav.querySelectorAll("a[data-spy]")) : [];
      const onScroll = () => {
        const y = window.scrollY || window.pageYOffset || 0;
        const hh = hero ? Math.max(220, hero.offsetHeight - 130) : 360;
        if (nav)
          nav.style.transform = y > hh ? "translateY(0)" : "translateY(-100%)";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      if (IO && links.length) {
        const secs = links
          .map((a) => root.getElementById(a.getAttribute("data-spy")))
          .filter(Boolean);
        const sp = new IO(
          (ents) => {
            ents.forEach((e) => {
              if (e.isIntersecting) {
                const id = e.target.id;
                links.forEach((a) => {
                  const on = a.getAttribute("data-spy") === id;
                  a.style.color = on ? "#350004" : "#9A8B7E";
                  a.style.borderBottomColor = on ? "#C49A57" : "transparent";
                });
              }
            });
          },
          { rootMargin: "-44% 0px -52% 0px" },
        );
        secs.forEach((s) => sp.observe(s));
      }
    } catch (err) {
      console.warn("atlas init", err);
      revealAll();
      const nav = root.getElementById("atlasNav");
      if (nav) nav.style.transform = "translateY(0)";
    }
});
