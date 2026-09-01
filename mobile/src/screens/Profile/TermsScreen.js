import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";
import { termsData } from "../../constants/termsData";

export default function TermsScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>{termsData.intro}</Text>

        {termsData.sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.content ? <Text style={styles.paragraph}>{section.content}</Text> : null}

            {section.items?.map((item, idx) => (
              <Text key={idx} style={styles.item}>
                {"• "}
                <Text style={styles.itemLabel}>{item.label}: </Text>
                {item.text}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 14,
    color: colors.navy,
    fontWeight: "600",
    lineHeight: 21,
    marginBottom: 20,
    textAlign: "justify",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.navy,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
    textAlign: "justify",
  },
  item: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
    marginBottom: 6,
    textAlign: "justify",
  },
  itemLabel: {
    fontWeight: "700",
    color: colors.navy,
  },
});
