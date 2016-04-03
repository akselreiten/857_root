import csv

trans = []
trans.append(["source","value","date"])

with open("global-funding.csv") as csvfile:
	reader = csv.reader(csvfile)
	header = []
	for row in reader:
		if row[0] == "Source": 
			header = row
			continue
		if row[0] == "Total": 
			continue
		for i in range(1,len(row)):
			trans.append([row[0],row[i],header[i]])
for elem in trans:
	print str(elem)

with open('global-funding-edited.csv', 'wb') as f:
	writer = csv.writer(f)
	writer.writerows(trans)
