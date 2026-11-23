import PropTypes from "prop-types";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.registerHyphenationCallback((word) => ["", word, ""]);

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Times-Roman",
  },
  pageContent: {
    margin: "80px",
  },
  section: {
    maxWidth: 435,
  },
  large: {
    fontSize: 18,
    textAlign: "center",
  },
  largeSpaced: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  largeBold: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontWeight: "bold",
  },
  largeBoldSpaced: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontWeight: "bold",
    marginBottom: 20,
  },
  center: {
    fontSize: 14,
    textAlign: "center",
  },
  centerSpaced: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  centerBold: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Bold",
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    textAlign: "left",
  },
  textSpaced: {
    fontSize: 14,
    marginBottom: 20,
  },
  textBold: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    fontWeight: "bold",
  },
  textRight: {
    fontSize: 14,
    textAlign: "right",
  },
  textRightBold: {
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Times-Bold",
    fontWeight: "bold",
    marginTop: 20,
  },
  logo: {
    maxWidth: 435,
  },
  image: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 360,
    maxHeight: 200,
  },
  textBlock: {
    fontSize: 14,
    textAlign: "justify",
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
    maxWidth: 420,
  },
  listItem: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
  },
  listNumber: {
    marginRight: 10,
    fontSize: 14,
  },
  outerFrame: {
    position: "absolute",
    top: "1.25cm",
    left: "1.25cm",
    right: "1.25cm",
    bottom: "1.25cm",
    borderWidth: "1.1mm",
    borderColor: "#000000",
    borderStyle: "solid",
  },
  innerFrame: {
    position: "absolute",
    top: "1.56cm",
    left: "1.56cm",
    right: "1.56cm",
    bottom: "1.56cm",
    borderWidth: "0.4mm",
    borderColor: "#000000",
    borderStyle: "solid",
  },
});

const PageFrame = () => (
  <>
    <View style={styles.outerFrame} />
    <View style={styles.innerFrame} />
  </>
);

// Create Document Component
const ProjectPDF = ({
  studentName,
  grade,
  projectName,
  subject,
  teacher,
  teacherSubject,
  year,
}) => {
  const teacherLabel = teacherSubject
    ? `${teacher}, ${teacherSubject} Faculty`
    : teacher;

  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <PageFrame />
      <View style={styles.pageContent}>
      <View style={styles.section}>
        <Text style={styles.largeBoldSpaced}>
          {subject.includes(" (Practical)")
            ? subject.replace(" (Practical)", "")
            : projectName}
        </Text>
        <Text style={styles.largeSpaced}>
          {subject.includes(" (Practical)")
            ? "PRACTICAL RECORD"
            : "PROJECT REPORT"}
        </Text>
        <Text style={styles.centerSpaced}>Submitted by</Text>
        <Text style={styles.centerBold}>{studentName.toUpperCase()}</Text>
        {grade === "XII" && (
          <Text style={[styles.centerBold, { marginRight: 80 }]}>UID No.:</Text>
        )}
        <Text style={styles.center}>to</Text>
        <Text style={styles.center}>
          Council for the Indian School Certificate Examination (CISCE)
        </Text>
      </View>
      <View style={styles.logo}>
        <Image src="/gps-logo.png" style={styles.image} />
      </View>
      <View style={styles.section}>
        <Text style={styles.largeBoldSpaced}>
          Department of Secondary Level
        </Text>
        <Text style={styles.large}>Greenwoods Public School</Text>
        <Text style={styles.large}>Bekal</Text>
        <Text style={styles.large}>FEBRUARY {year}</Text>
      </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <PageFrame />
      <View style={styles.pageContent}>
      <View style={styles.section}>
        <Text style={styles.largeBoldSpaced}>DECLARATION</Text>
        <Text style={styles.textBlock}>
          I undersigned solemnly declare that the{" "}
          {subject.includes(" (Practical)") && "practical record"}
          {!subject.includes(" (Practical)") && 'project report "'}
          {!subject.includes(" (Practical)") && (
            <Text style={styles.textBold}>{projectName}</Text>
          )}
          {!subject.includes(" (Practical)") && '"'} is based on my work carried
          out during the course of our study under the supervision of{" "}
          {teacherLabel}.
        </Text>
        <Text style={styles.textBlock}>
          I assert the statement made and conclusions drawn are an outcome of my
          research work. I further certify that
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listNumber}>1.</Text>
            <Text style={styles.text}>
              The work contained in the{" "}
              {subject.includes(" (Practical)") ? "report" : "record"} is
              original and has been done by me under the general supervision of
              my supervisor.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listNumber}>2.</Text>
            <Text style={styles.text}>
              The work has not been submitted to any other institution for any
              other degree/diploma/certificate in this school.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listNumber}>3.</Text>
            <Text style={styles.text}>
              We have followed the guidelines forwarded by the board in writing
              the {subject.includes(" (Practical)") ? "report" : "record"}.
            </Text>
          </View>
        </View>
        <Text style={styles.textRightBold}>{studentName.toUpperCase()}</Text>
      </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <PageFrame />
      <View style={styles.pageContent}>
      <View style={styles.section}>
        {/* <Text style={styles.largeBold}>GREENWOODS PUBLIC SCHOOL</Text>
        <Text style={styles.largeBoldSpaced}>BEKAL</Text> */}
        <Text style={styles.largeBoldSpaced}>
          SECONDARY LEVEL DEARTMENT
        </Text>
      </View>
      <View style={styles.logo}>
        <Image src="/gps-logo.png" style={styles.image} />
      </View>
      <View style={styles.section}>
        <Text style={styles.largeBoldSpaced}>CERTIFICATE</Text>
        <Text style={styles.textBlock}>
          This is to certify that{" "}
          <Text style={styles.textBold}>{studentName.toUpperCase()}</Text>, a
          student of class {grade} has successfully completed the{" "}
          {subject.includes(" (Practical)") && "practical record work"}
          {!subject.includes(" (Practical)") && 'research on the project "'}
          {!subject.includes(" (Practical)") && (
            <Text style={styles.textBold}>{projectName}</Text>
          )}
          {!subject.includes(" (Practical)") && '"'} under the guidance of{" "}
          {teacherLabel} during the year {year - 1}-{year}
          {grade === "XII" &&
            ` in partial fulfillment of ` +
              (subject.includes(" (Practical)")
                ? `${subject.replace(" (Practical)", "")} practical examination`
                : `${subject} project`) +
              ` conducted by ISC, New Delhi`}
          .
        </Text>
      </View>
      <View
        style={[
          styles.section,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "40px",
          },
        ]}
      >
        <Text style={styles.text}>Project Coordinator:</Text>
        <Text
          style={[styles.text, { textAlign: "right", marginRight: "80px" }]}
        >
          External Examiner(s):
        </Text>
      </View>
      <View style={[styles.section, { marginTop: "40px" }]}>
        <Text style={styles.text}>Principal:</Text>
      </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <PageFrame />
      <View style={styles.pageContent}>
      <View style={styles.section}>
        <Text style={styles.largeBoldSpaced}>ACKNOWLEDGEMENT</Text>
        <Text style={styles.textBlock}>
          Success and final outcome of this{" "}
          {subject.includes(" (Practical)") ? "practical work" : "project"}{" "}
          required a lot of guidance and assistance from many people and I am
          extremely fortunate to have got this all along the completion of my{" "}
          {subject.includes(" (Practical)") ? "practical work" : "project work"}
          . Whatever I have done is only due to such guidance and assistance and
          I would not forget to thank them.
        </Text>
        <Text style={styles.textBlock}>
          First and foremost, I take this opportunity to express my gratitude to
          our principal <Text style={styles.textBold}>Mr. Ganesh Kattayat</Text>
          , for his enthusiastic help, valuable suggestions and constant
          encouragement throughout my work. I owe my profound gratitude to our
          HM <Text style={styles.textBold}>Mrs. Sreeja V</Text> (HS & HSS
          Section) for her valuable suggestions and support.
        </Text>
        <Text style={styles.textBlock}>
          I am indebted to our{" "}
          {subject.includes(" (Practical)") ? "practical" : "project"}{" "}
          coordinator
          {teacher.toLowerCase().includes("and") && "s"}{" "}
          <Text style={styles.textBold}>{teacherLabel}</Text>, for their timely
          guidance and support throughout this work.
        </Text>
        <Text style={styles.textBlock}>
          I thank God almighty for all the blessings received during this
          endeavor. Last, but not the least, I thank all my friends and my
          family for the support and encouragement they have given during the
          course of this work.
        </Text>
        <Text style={styles.textRightBold}>{studentName.toUpperCase()}</Text>
      </View>
      <View style={[styles.section, { marginTop: "40px" }]}>
        <Text style={styles.text}>Date:</Text>
        <Text style={[styles.text, { marginTop: "10px" }]}>Place:</Text>
      </View>
      </View>
    </Page>
  </Document>
  );
};

ProjectPDF.propTypes = {
  studentName: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  projectName: PropTypes.string,
  subject: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  teacherSubject: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProjectPDF;
