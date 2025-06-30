import { CertificateProps } from "./Certificate.type";

export function Certificate(props: CertificateProps) {
  const { userName, titleCourse, certRef } = props;

  return (
    <div
      ref={certRef}
      style={{
        width: "900px",
        height: "600px",
        position: "relative",
        color: "#000",
        fontFamily: "sans-serif",
      }}
    >
      <img
        src="/MKT.png"
        alt="Certificado"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        crossOrigin="anonymous"
      />

      <p
        style={{
          position: "absolute",
          top: "52%",
          left: "30%",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 600,
        }}
      >
        {userName}
      </p>

      <p
        style={{
          position: "absolute",
          top: "72%",
          left: "35%",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        {titleCourse}
      </p>

      <p
        style={{
          position: "absolute",
          bottom: "13%",
          left: "9%",
          fontSize: "30px",
        }}
      >
        {new Date().toLocaleDateString("es-BO")}
      </p>
    </div>
  );
}
